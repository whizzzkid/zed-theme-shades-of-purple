#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const TRANSPARENCY_LEVELS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
const VARIANT_SUFFIX_RE = / - \d{1,2}%$/;
const BASE_TEMPLATE_PATH = path.resolve(process.cwd(), "scripts", "base-templates.json");
const OUTPUT_THEME_PATH = path.resolve(process.cwd(), "themes", "shades-of-purple.json");
const PANEL_STACK_ALPHA_FACTOR = 0.72;
// Zed paints panel.background three times in the agent panel (dock, panel, conversation view) but once under
// the threads sidebar, so one alpha can't suit both. 0.315 puts the 20% variant at 0x40, the tested balance.
const PANEL_BACKGROUND_ALPHA_FACTOR = 0.315;
// The terminal view already sits on an editor.background fill, so its own fill only adds opacity.
const TERMINAL_BACKGROUND_ALPHA_FACTOR = 0;
// Per-key alpha multipliers applied on top of the main scaling in translucent variants only.
const TRANSLUCENT_ALPHA_FACTORS = new Map([
  ["panel.background", PANEL_BACKGROUND_ALPHA_FACTOR],
  ["terminal.background", TERMINAL_BACKGROUND_ALPHA_FACTOR],
  ["surface.background", PANEL_STACK_ALPHA_FACTOR],
  ["elevated_surface.background", PANEL_STACK_ALPHA_FACTOR],
  ["drop_target.background", PANEL_STACK_ALPHA_FACTOR],
  ["element.background", PANEL_STACK_ALPHA_FACTOR],
  ["element.disabled", PANEL_STACK_ALPHA_FACTOR],
  ["ghost_element.disabled", PANEL_STACK_ALPHA_FACTOR],
]);
// Selection and hover highlights (list rows, project panel entries, threads) keep their template alpha in every
// variant; scaling them with the background made the active row invisible against translucent panels.
const FIXED_ALPHA_KEYS = new Set([
  "element.hover",
  "element.selected",
  "ghost_element.hover",
  "ghost_element.selected",
]);

function parseHexColor(color) {
  if (typeof color !== "string") return null;

  const six = color.match(/^#([0-9a-fA-F]{6})$/);
  if (six) return { rgb: six[1].toUpperCase(), alpha: 0xff };

  const eight = color.match(/^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})$/);
  if (eight) {
    return {
      rgb: eight[1].toUpperCase(),
      alpha: Number.parseInt(eight[2], 16),
    };
  }

  return null;
}

function toHex(value) {
  return value.toString(16).toUpperCase().padStart(2, "0");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function scaleAlpha(sourceAlpha, targetMainAlpha, templateMainAlpha) {
  if (templateMainAlpha <= 0) return sourceAlpha;
  return clamp(Math.round((sourceAlpha * targetMainAlpha) / templateMainAlpha), 0, 255);
}

function variantName(baseName, transparency) {
  if (transparency === 0) return baseName;
  if (transparency === 5) return `${baseName} - 05%`;
  return `${baseName} - ${transparency}%`;
}

function baseNameOf(name) {
  return name.replace(VARIANT_SUFFIX_RE, "");
}

function shouldScaleColor(pathSegments) {
  const flattenedPath = flattenPath(pathSegments);

  if (flattenedPath.length === 0) return false;

  const fullPath = flattenedPath.join(".");
  if (FIXED_ALPHA_KEYS.has(fullPath)) return false;

  const key = flattenedPath[flattenedPath.length - 1];

  if (key === "background") return true;
  if (key.endsWith("_background")) return true;

  // Element surfaces are interactive backgrounds in Zed themes.
  if (fullPath.startsWith("element.")) return true;
  if (fullPath.startsWith("ghost_element.")) return true;

  return false;
}

function flattenPath(pathSegments) {
  const flattenedPath = [];
  for (const part of pathSegments) {
    if (typeof part !== "string") continue;
    flattenedPath.push(...part.split("."));
  }
  return flattenedPath;
}

function translucentAlphaFactorOf(pathSegments) {
  return TRANSLUCENT_ALPHA_FACTORS.get(flattenPath(pathSegments).join("."));
}

function rewriteNode(node, pathSegments, targetMainAlpha, templateMainAlpha) {
  if (Array.isArray(node)) {
    return node.map((item, index) => rewriteNode(item, pathSegments.concat(index), targetMainAlpha, templateMainAlpha));
  }

  if (node && typeof node === "object") {
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      out[key] = rewriteNode(value, pathSegments.concat(key), targetMainAlpha, templateMainAlpha);
    }
    return out;
  }

  if (typeof node === "string") {
    if (!shouldScaleColor(pathSegments)) return node;

    const parsed = parseHexColor(node);
    if (!parsed) return node;

    let alpha = scaleAlpha(parsed.alpha, targetMainAlpha, templateMainAlpha);

    // Side panels have multiple overlapping surfaces (panel + surface + element),
    // so reduce per-layer alpha to keep perceived transparency aligned with bars.
    const translucentAlphaFactor = translucentAlphaFactorOf(pathSegments);
    if (targetMainAlpha < 255 && translucentAlphaFactor !== undefined) {
      alpha = clamp(Math.round(alpha * translucentAlphaFactor), 0, 255);
    }

    return `#${parsed.rgb}${toHex(alpha)}`;
  }

  return node;
}

function assertBaseTemplates(baseDoc) {
  if (!baseDoc || typeof baseDoc !== "object") {
    throw new Error("Base template file is not a valid JSON object.");
  }
  if (!Array.isArray(baseDoc.themes) || baseDoc.themes.length === 0) {
    throw new Error("No themes found in theme file.");
  }
  for (const theme of baseDoc.themes) {
    if (!theme || typeof theme !== "object" || typeof theme.name !== "string") {
      throw new Error("Every base template theme must be an object with a name.");
    }
    if (VARIANT_SUFFIX_RE.test(theme.name)) {
      throw new Error(`Base template name must be unsuffixed: ${theme.name}`);
    }
    if (!theme.style || typeof theme.style !== "object") {
      throw new Error(`Base template theme is missing style object: ${theme.name}`);
    }
  }
}

function generateVariants(baseDoc) {
  assertBaseTemplates(baseDoc);

  const generated = [];

  for (const template of baseDoc.themes) {
    const baseName = baseNameOf(template.name);
    const parsedTemplateBackground = parseHexColor(template.style.background);
    const templateMainAlpha = parsedTemplateBackground?.alpha ?? 0xff;

    for (const transparency of TRANSPARENCY_LEVELS) {
      const targetMainAlpha = Math.round(((100 - transparency) / 100) * 255);
      const variant = structuredClone(template);

      variant.name = variantName(baseName, transparency);
      variant.style = rewriteNode(template.style, [], targetMainAlpha, templateMainAlpha);
      variant.style["background.appearance"] = transparency === 0 ? "opaque" : "blurred";

      generated.push(variant);
    }
  }

  return {
    ...baseDoc,
    themes: generated,
  };
}

const baseDoc = JSON.parse(fs.readFileSync(BASE_TEMPLATE_PATH, "utf8"));
const generatedDoc = generateVariants(baseDoc);
fs.writeFileSync(OUTPUT_THEME_PATH, `${JSON.stringify(generatedDoc, null, 2)}\n`);

console.log(
  `Generated ${generatedDoc.themes.length} variants from ${baseDoc.themes.length} base themes: ${OUTPUT_THEME_PATH}`,
);

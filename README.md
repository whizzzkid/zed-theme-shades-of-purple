# Shades of Purple for Zed

> A professional theme suite with hand-picked & bold shades of purple for your Zed editor and terminal.

Ported from the popular [Shades of Purple](https://github.com/ahmadawais/shades-of-purple-vscode) VS Code theme by Ahmad Awais.

## Installation

1. Open Zed
2. Open the Extensions panel (`Cmd+Shift+X` or `Zed > Extensions`)
3. Search for "Shades of Purple"
4. Click **Install**
5. Open your settings and set your preferred variant:

```json
{
  "theme": "Shades of Purple"
}
```

## Theme Variants

### Shades of Purple (Standard)

The original bold purple experience. Deep purple editor backgrounds (`#2D2B55`) with vibrant syntax colors.

### Shades of Purple (Super Dark)

For those who prefer even darker backgrounds. Editor background drops to `#191830` while keeping the same vibrant syntax highlighting.

### Shades of Purple (Italic)

Same colors as Standard, with italic styling on keywords, comments, properties, attributes, and other semantic tokens. Pairs beautifully with fonts that have cursive italics (Operator Mono, Dank Mono, Cartograph CF, etc.).

### Shades of Purple (Super Dark + Italic)

The best of both worlds: ultra-dark backgrounds from Super Dark combined with the italic styling from the Italic variant.

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| ![#2D2B55](https://via.placeholder.com/15/2D2B55/2D2B55) | `#2D2B55` | Editor Background |
| ![#1E1E3F](https://via.placeholder.com/15/1E1E3F/1E1E3F) | `#1E1E3F` | Sidebar/Panel Background |
| ![#A599E9](https://via.placeholder.com/15/A599E9/A599E9) | `#A599E9` | Muted Text / UI Foreground |
| ![#FF9D00](https://via.placeholder.com/15/FF9D00/FF9D00) | `#FF9D00` | Keywords / Operators |
| ![#FAD000](https://via.placeholder.com/15/FAD000/FAD000) | `#FAD000` | Functions / Attributes / Accent |
| ![#A5FF90](https://via.placeholder.com/15/A5FF90/A5FF90) | `#A5FF90` | Strings |
| ![#3AD900](https://via.placeholder.com/15/3AD900/3AD900) | `#3AD900` | Template Strings / Success |
| ![#FF628C](https://via.placeholder.com/15/FF628C/FF628C) | `#FF628C` | Constants / Numbers |
| ![#FB94FF](https://via.placeholder.com/15/FB94FF/FB94FF) | `#FB94FF` | Function Definitions |
| ![#9EFFFF](https://via.placeholder.com/15/9EFFFF/9EFFFF) | `#9EFFFF` | Types / Tags / Variables |
| ![#FFEE80](https://via.placeholder.com/15/FFEE80/FFEE80) | `#FFEE80` | Properties |
| ![#B362FF](https://via.placeholder.com/15/B362FF/B362FF) | `#B362FF` | Comments |
| ![#80FFBB](https://via.placeholder.com/15/80FFBB/80FFBB) | `#80FFBB` | Enums / Support |
| ![#E1EFFF](https://via.placeholder.com/15/E1EFFF/E1EFFF) | `#E1EFFF` | Variables / Punctuation |
| ![#6943FF](https://via.placeholder.com/15/6943FF/6943FF) | `#6943FF` | Info / Hints |
| ![#EC3A37](https://via.placeholder.com/15/EC3A37/EC3A37) | `#EC3A37` | Errors / Deleted |
| ![#FF7200](https://via.placeholder.com/15/FF7200/FF7200) | `#FF7200` | Conflicts / Search Match |

## Feature Parity: VS Code Original vs Zed Port

| Feature | VS Code Original | Zed Port | Notes |
|---------|-----------------|----------|-------|
| Standard dark theme | Yes | Yes | Full color mapping |
| Super Dark variant | Yes (BETA) | Yes | Darker UI backgrounds, same syntax |
| Italic variant | Yes | Yes | Italic font_style on matching tokens |
| Editor background/foreground | Yes | Yes | Direct mapping |
| Activity bar / sidebar / panels | Yes (~30 properties) | Yes | Mapped to Zed panel/surface/element |
| Tab styling (active/inactive) | Yes | Yes | Active border accent #FAD000 |
| Status bar colors | Yes | Yes | Background, foreground, debug states |
| Terminal ANSI (16 colors) | Yes | Yes | Direct mapping |
| Terminal bright colors (8) | Yes | Yes | Direct mapping |
| Terminal dim colors | No | Yes (derived) | Derived at ~70% brightness |
| Scrollbar colors | Yes | Yes | Slider, hover, active |
| Git decoration colors | Yes (5 states) | Yes (10 states) | Zed has more granular states |
| Error/Warning/Info indicators | Yes | Yes | Plus Zed-specific: hint, success |
| Diff editor colors | Yes | Yes | Mapped to created/deleted backgrounds |
| Editor gutter (added/modified/deleted) | Yes | Yes | |
| Bracket matching | Yes | Yes | #AD70FC46 |
| Search match highlighting | Yes | Yes | Active + background matches |
| Indent guides (active/inactive) | Yes | Yes | |
| Line highlight | Yes | Yes | #1F1F41 |
| Cursor color | Yes (#FAD000) | N/A | Zed uses player colors for cursors |
| Collaborative cursors (players) | N/A | Yes (8 players) | Zed-specific feature |
| **Syntax: Comments** | #B362FF | #B362FF | Exact match |
| **Syntax: Keywords** | #FF9D00 | #FF9D00 | Exact match |
| **Syntax: Strings** | #A5FF90 | #A5FF90 | Exact match |
| **Syntax: Template strings** | #3AD900 | #3AD900 | Maps to string.escape |
| **Syntax: Constants/Numbers** | #FF628C | #FF628C | Exact match |
| **Syntax: Functions** | #FAD000 | #FAD000 | Exact match |
| **Syntax: Function defs** | #FB94FF | #FB94FF | Maps to constructor |
| **Syntax: Types/Tags** | #9EFFFF | #9EFFFF | Exact match |
| **Syntax: Variables** | #E1EFFF | #E1EFFF | Exact match |
| **Syntax: Properties** | #FFEE80 | #FFEE80 | Exact match |
| **Syntax: Attributes** | #FAD000 | #FAD000 | Exact match |
| **Syntax: Punctuation** | #E1EFFF | #E1EFFF | Exact match |
| **Syntax: Support/enum** | #80FFBB | #80FFBB | Exact match |
| Language: JS/TS/React | Yes | Yes | Mapped to semantic tokens |
| Language: Python | Yes | Yes | |
| Language: PHP | Yes | Yes | |
| Language: Go | Yes | Yes | |
| Language: Ruby | Yes | Yes | |
| Language: Rust | Yes | Yes | |
| Language: C# | Yes | Yes | |
| Language: HTML/Pug | Yes | Yes | |
| Language: CSS | Yes | Yes | |
| Language: Markdown | Yes | Yes | |
| Language: JSON/YAML/TOML/INI | Yes | Yes | |
| Language: SQL/GraphQL/Docker/ENV | Yes | Yes | |
| Peek view colors | Yes | N/A | Zed doesn't have peek view UI |
| Notification colors | Yes | N/A | Zed uses its own notification style |
| Welcome page colors | Yes | N/A | Zed doesn't have welcome page theming |
| Settings editor colors | Yes | N/A | Zed settings is a file, not UI |

> **Note:** Zed uses semantic tokens (e.g., `keyword`, `function`, `type`) instead of VS Code's TextMate scope selectors (e.g., `source.js storage.type.function`). Language-specific color overrides in the VS Code theme are "flattened" into the closest Zed semantic token. The visual result should be nearly identical since the color choices are consistent across the original theme's language-specific scopes.

## Attribution & Credits

- **Original theme:** [Shades of Purple](https://github.com/ahmadawais/shades-of-purple-vscode) by [Ahmad Awais](https://github.com/ahmadawais) (MIT License)
- **Inspired by:** Roberto Achar's original tmTheme
- **Ported to Zed by:** [whizzzkid](https://github.com/whizzzkid)

## License

[MIT](LICENSE) - Copyright (c) 2026 Nishant Arora

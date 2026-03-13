# Configuration

Vimanco configurations live under the `vimanco` namespace. Each one maps to a corresponding `vim.*` setting.

When `vimanco` activates or when settings change, it synchronizes all `vimanco.*` settings to `vim.*`.

## Presets

Use the `vimanco.preset` setting to quickly apply a curated set of configurations:

```json
{
  "vimanco.preset": "default"
}
```

Available presets:
- **`minimal`** — Only essential settings (system clipboard + leader key)
- **`default`** — Balanced configuration (recommended)
- **`full`** — All plugins and features enabled

Individual settings override the preset values. For example, if you're using the `default` preset but want to disable easyMotion:

```json
{
  "vimanco.preset": "default",
  "vimanco.easyMotion": false
}
```

## Settings

| Setting | Type | Default | Maps to `vim.*` | Description |
| --- | --- | --- | --- | --- |
| `vimanco.preset` | `string` | `"default"` | (system) | Apply a preset configuration (minimal, default, or full) |
| `vimanco.useSystemClipboard` | `boolean` | `true` | `vim.useSystemClipboard` | System clipboard integration |
| `vimanco.easyMotion` | `boolean` | `true`* | `vim.easymotion` | EasyMotion plugin |
| `vimanco.incSearch` | `boolean` | `true`* | `vim.incsearch` | Incremental search |
| `vimanco.hlSearch` | `boolean` | `true`* | `vim.hlsearch` | Search highlighting |
| `vimanco.surround` | `boolean` | `true`* | `vim.surround` | Vim-surround plugin |
| `vimanco.sneak` | `boolean` | `false`* | `vim.sneak` | Vim-sneak plugin |
| `vimanco.smartcase` | `boolean` | `true`* | `vim.smartcase` | Override ignorecase if search contains uppercase |
| `vimanco.ignorecase` | `boolean` | `true`* | `vim.ignorecase` | Ignore case in search patterns |
| `vimanco.camelCaseMotion` | `boolean` | `false`* | `vim.camelCaseMotion.enable` | CamelCaseMotion plugin |
| `vimanco.leader` | `string` | `"<space>"` | `vim.leader` | Leader key |
| `vimanco.insertModeKeyBindings` | `array` | `[{"before":["j","j"],"after":["<Esc>"]}]` | `vim.insertModeKeyBindings` | Insert-mode bindings |
| `vimanco.normalModeKeyBindingsNonRecursive` | `array` | See below | `vim.normalModeKeyBindingsNonRecursive` | Normal-mode non-recursive bindings |
| `vimanco.visualModeKeyBindingsNonRecursive` | `array` | `[]` | `vim.visualModeKeyBindingsNonRecursive` | Visual-mode non-recursive bindings |
| `vimanco.handleKeys` | `object` | See below | `vim.handleKeys` | Keys delegated to VS Code |

_\* These defaults vary by preset. See the Presets section above._

## `vimanco.normalModeKeyBindingsNonRecursive` (Default)
`<leader> d` maps to `dd` (delete line).
`K` maps to the command `lineBreakInsert` (silent, splits line at cursor).

```json
[
  {
    "before": ["<leader>", "d"],
    "after": ["d", "d"]
  },
  {
    "before": ["K"],
    "commands": [
      {
        "command": "lineBreakInsert",
        "args": []
      }
    ],
    "silent": true
  }
]
```

## `vimanco.handleKeys` (Default)
Delegates several key presses back to VS Code (e.g., `<C-f>`, `<C-x>`, `<C-c>`, `<C-v>`). These keys bypass Vim.

```json
{
  "<C-a>": false,
  "<C-f>": false,
  "<C-x>": false,
  "<C-c>": false,
  "<C-v>": false,
  "<C-z>": false,
  "<C-n>": false,
  "<tab>": false
}
```
# Configuration

Vimanco configurations live under the `vimanco` namespace. Each one maps to a corresponding `vim.*` setting.

When `vimanco` activates or when settings change, it synchronizes all `vimanco.*` settings to `vim.*`.

| Setting | Type | Default | Maps to `vim.*` | Description |
| --- | --- | --- | --- | --- |
| `vimanco.useSystemClipboard` | `boolean` | `true` | `vim.useSystemClipboard` | System clipboard integration |
| `vimanco.easyMotion` | `boolean` | `true` | `vim.easymotion` | EasyMotion plugin |
| `vimanco.incSearch` | `boolean` | `true` | `vim.incsearch` | Incremental search |
| `vimanco.hlSearch` | `boolean` | `true` | `vim.hlsearch` | Search highlighting |
| `vimanco.leader` | `string` | `"<space>"` | `vim.leader` | Leader key |
| `vimanco.insertModeKeyBindings` | `array` | `[{"before":["j","j"],"after":["<Esc>"]}]` | `vim.insertModeKeyBindings` | Insert-mode bindings |
| `vimanco.normalModeKeyBindingsNonRecursive` | `array` | See below | `vim.normalModeKeyBindingsNonRecursive` | Normal-mode non-recursive bindings |
| `vimanco.handleKeys` | `object` | See below | `vim.handleKeys` | Keys delegated to VS Code |

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
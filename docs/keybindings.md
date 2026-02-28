# Keybindings

Vimanco overrides Several shortcuts and also delegates certain key bindings from `vscodevim` back to VS Code to improve interoperability.

| Key | Command | When Clause |
| --- | --- | --- |
| `Ctrl+N` | `workbench.action.files.newUntitledFile` | *(always)* |
| `Ctrl+J` | `selectNextSuggestion` | `suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus` |
| `Ctrl+K` | `selectPrevSuggestion` | `suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus` |
| `` Ctrl+` `` | `workbench.action.terminal.toggleTerminal` | `terminal.active` |
| `Ctrl+K` | `-extension.vim_ctrl+k` (unbind) | `editorTextFocus && vim.active && vim.use<C-k> && !inDebugRepl` |
| `Shift+Alt+K` | `editor.action.moveLinesUpAction` | `editorTextFocus && !editorReadonly` |
| `Shift+Alt+J` | `editor.action.moveLinesDownAction` | `editorTextFocus && !editorReadonly` |
| `Shift+Ctrl+K` | `editor.action.copyLinesUpAction` | `editorTextFocus && !editorReadonly` |
| `Shift+Ctrl+J` | `editor.action.copyLinesDownAction` | `editorTextFocus && !editorReadonly` |
| `Ctrl+T` | `-extension.vim_ctrl+t` (unbind) | `editorTextFocus && vim.active && vim.use<C-t> && !inDebugRepl` |

### Unbinds

Two keys (`Ctrl+K` and `Ctrl+T`) are intentionally unbound from Vim so that you can reuse them for native VS Code features.

### Commands

| Command ID | Title |
| --- | --- |
| `vimanco.updateVim` | **Vimanco: Update Vim Settings** |

Use this command (available from the Command Palette) to manually apply Vimanco settings if you happen to change `vim.*` settings independently.

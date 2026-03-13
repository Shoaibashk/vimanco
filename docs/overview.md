# Overview

**Vimanco** is an opinionated Vim configuration manager for the [VSCodeVim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) extension.

It acts as a **settings proxy** — it reads its own `vimanco.*` configuration properties and pushes them into the `vim.*` settings that VSCodeVim consumes. This lets users manage a curated set of Vim options through a single, unified configuration surface.

## Features

- **Centralized Configuration:** Manage your favorite VSCodeVim settings without memorizing all of the configuration keys.
- **Presets System:** Three curated presets help you get started quickly:
  - **Minimal:** Only essential settings (clipboard + leader key).
  - **Default (recommended):** Balanced set of plugins and bindings.
  - **Full:** All available plugins and bindings enabled.
- **Auto-Apply:** Automatically applies all `vimanco.*` settings to `vim.*` on activation and whenever you make changes in your `settings.json`.
- **Status Bar:** Shows your active preset and provides quick access to update settings.
- **Reset Option:** Easily revert to defaults with a single command.
- **Preconfigured defaults:**
  - `<space>` mapped to Leader Key out of the box.
  - Useful Insert mode keybindings (`jj` to `<Esc>`).
  - Useful default handleKeys settings so native VS Code shortcuts like `<C-f>`, `<C-x>`, `<C-c>`, `<C-v>` work reliably.
  - Seamless clipboard integration with system OS.

## Why Vimanco?

Managing complex `vim.*` objects (like `vim.insertModeKeyBindings` or `vim.normalModeKeyBindingsNonRecursive`) can get verbose and messy in VS Code's `settings.json`. Vimanco abstracts these away behind simpler `vimanco.*` options, providing an opinionated foundation that gets out of your way and lets you code.

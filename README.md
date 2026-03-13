
# Vimanco

![VS Code Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/shoaibashk.vimanco?style=flat-square&color=blue)
![VS Code Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/shoaibashk.vimanco?style=flat-square&color=blue)
![License](https://img.shields.io/github/license/Shoaibashk/vimanco?style=flat-square&color=blue)

An opinionated Vim configuration manager for the [VSCodeVim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) extension.

![Alt text](Assets/banner.png)

Vimanco acts as a **settings proxy** — it reads its own `vimanco.*` configuration properties and pushes them into the `vim.*` settings that VSCodeVim consumes. This lets you manage a curated set of Vim options, overrides, and unbinds through a single, unified configuration surface.

---

## 📖 Documentation

For full details, configuration options, keybindings, and the contribution guide, visit the **[Vimanco Documentation Site](https://shoaibashk.github.io/vimanco/)**.

- [Overview](https://shoaibashk.github.io/vimanco/#/overview.md)
- [Installation Guide](https://shoaibashk.github.io/vimanco/#/installation.md)
- [Configuration](https://shoaibashk.github.io/vimanco/#/configuration.md)
- [Keybindings](https://shoaibashk.github.io/vimanco/#/keybindings.md)
- [Development](https://shoaibashk.github.io/vimanco/#/development.md)

---

## Features

- **Centralized Configuration:** Manage complex `vim.*` settings with simple `vimanco.*` options.
- **Presets System:** Choose from three curated presets (Minimal, Default, Full) to quickly configure your Vim experience. Override individual settings as needed.
- **Auto-Apply:** Automatically applies all `vimanco.*` settings on activation and whenever you save your `settings.json`.
- **Status Bar Display:** Shows the active preset and allows quick access to update settings with a single click.
- **Reset to Defaults:** Easily reset all Vimanco settings to their defaults with the **Vimanco: Reset Settings to Defaults** command.
- **Preconfigured Defaults:** Leader key mapping (`<space>`), useful Insert mode bindings (`jj` to `<Esc>`), and native VS Code shortcuts delegated back so `<C-c>`, `<C-v>`, `<C-f>` work instantly.
- **EasyMotion & System Clipboard:** Pre-configured and enabled right out of the box.

## Quick Start

### Installation

Vimanco configures and interacts with VSCodeVim, so **VSCodeVim must be installed**.

Install Vimanco via the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=shoaibashk.vimanco) or the CLI:

```shell
code --install-extension vscodevim.vim
code --install-extension shoaibashk.vimanco
```

### Commands

- **Vimanco: Update Vim Settings** (`Ctrl+Shift+P`) — Manually apply your Vimanco settings to VSCodeVim. This also runs automatically on extension activation and whenever settings change.
- **Vimanco: Reset Settings to Defaults** (`Ctrl+Shift+P`) — Reset all Vimanco settings to their default values.
- Click the **Vimanco** status bar button (bottom-right) to quickly update your settings.

---

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

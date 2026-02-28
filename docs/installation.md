# Installation

## Prerequisites

Vimanco configures and interacts with the popular [VSCodeVim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) extension.

You must have **VSCodeVim** installed and enabled. Vimanco relies on `vscodevim.vim` as an extension dependency and will check for it on activation.

## VS Code Marketplace

Vimanco can be installed directly via the VS Code Extension Marketplace:

1. Open VS Code.
2. Open the Extensions View (`Ctrl+Shift+X` on Windows/Linux, `Cmd+Shift+X` on macOS).
3. Search for **Vimanco**.
4. Click **Install**.

## Command Line Installation

Alternatively, you can install the extension directly from the VS Code CLI:

```shell
code --install-extension shoaibashk.vimanco
```

## Local Installation (VSIX)

If you'd like to build and install the extension locally from source:

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/Shoaibashk/vimanco.git
   cd vimanco
   npm install
   ```

2. Package the extension using `vsce` (requires `vsce` to be installed globally via `npm install -g @vscode/vsce`):
   ```bash
   vsce package
   ```

3. Install the generated `.vsix` package:
   ```bash
   code --install-extension vimanco-{version}.vsix
   ```

# Development

Vimanco does not have any runtime dependencies — everything is bundled via `webpack` + `ts-loader`. Webpack targets CommonJS output at `dist/extension.js`. Testing is achieved with Mocha and the vscode extension test framework.

## Project Setup

1. Check out the project.
2. Install `node` and `npm`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the extension:
   ```bash
   npm run compile
   ```
5. Build the tests:
   ```bash
   npm run compile-tests
   ```

## Development Commands

| Command | Purpose |
| --- | --- |
| `npm run compile` | Single-shot Webpack build |
| `npm run watch` | Webpack build with `--watch` flag for Dev |
| `npm run package` | Packaged Production Webpack build (`--mode production` and `hidden-source-map`) |
| `npm run compile-tests` | Compile TypeScript tests (`tsc`) |
| `npm run watch-tests` | Complies and auto-updates test outputs |
| `npm run lint` | Linter |
| `npm test` | Run Mocha Tests against vscode instances |
| `npm run pkgupdate` | Updates Gulp versions then builds a `vsce package` |

## Releasing a New Version

We use `gulp` for version bumps, tagging, and committing. 

```bash
# Bumps the version in `package.json`, commits the change, and tags via git.
gulp release --ver 1.0.1
```

Or you can use the individual commands directly:

```bash
gulp updateVersion --ver {versionNumber} # e.g. 1.0.1 (No 'v' prefix)
gulp createGitCommit --ver 1.0.1
gulp createGitTag --ver 1.0.1
```

Once correctly tagged, push it:

```bash
git push origin v1.0.1
```

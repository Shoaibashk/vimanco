/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const GetConfiguration_1 = __webpack_require__(2);
const GetVimExtensionVersion_1 = __webpack_require__(3);
const Logger_1 = __webpack_require__(4);
const Presets_1 = __webpack_require__(5);
let statusBarItem;
function getEffectiveBoolSetting(ext, key, presetName) {
    const inspected = ext.inspect(key);
    // If the user explicitly set the value, use it; otherwise fall back to preset
    if (inspected?.globalValue !== undefined || inspected?.workspaceValue !== undefined) {
        return ext.get(key) ?? (0, Presets_1.getPreset)(presetName)[key];
    }
    return (0, Presets_1.getPreset)(presetName)[key];
}
async function applyVimSettings() {
    const vimExt = vscode.extensions.getExtension('vscodevim.vim');
    if (!vimExt) {
        vscode.window.showWarningMessage('Vimanco: VSCodeVim extension is not installed. Settings were not applied.');
        return false;
    }
    const userSettings = (0, GetConfiguration_1.GetConfiguration)();
    const ext = (0, GetConfiguration_1.GetCurrentExtensionConfiguration)();
    const presetName = ext.get('preset') ?? 'default';
    try {
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'useSystemClipboard', getEffectiveBoolSetting(ext, 'useSystemClipboard', presetName));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'easymotion', getEffectiveBoolSetting(ext, 'easyMotion', presetName));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'incsearch', getEffectiveBoolSetting(ext, 'incSearch', presetName));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'hlsearch', getEffectiveBoolSetting(ext, 'hlSearch', presetName));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'surround', getEffectiveBoolSetting(ext, 'surround', presetName));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'sneak', getEffectiveBoolSetting(ext, 'sneak', presetName));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'smartcase', getEffectiveBoolSetting(ext, 'smartcase', presetName));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'ignorecase', getEffectiveBoolSetting(ext, 'ignorecase', presetName));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'camelCaseMotion.enable', getEffectiveBoolSetting(ext, 'camelCaseMotion', presetName));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'insertModeKeyBindings', ext.get('insertModeKeyBindings'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'normalModeKeyBindingsNonRecursive', ext.get('normalModeKeyBindingsNonRecursive'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'visualModeKeyBindingsNonRecursive', ext.get('visualModeKeyBindingsNonRecursive'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'leader', ext.get('leader'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'handleKeys', ext.get('handleKeys'));
    }
    catch (err) {
        Logger_1.Logger.error(`Failed to apply Vim settings: ${err}`);
        vscode.window.showWarningMessage(`Vimanco: Failed to apply settings — ${err}`);
        return false;
    }
    Logger_1.Logger.info(`Vim settings updated from Vimanco configuration (preset: ${presetName}).`);
    updateStatusBar(presetName);
    return true;
}
async function resetToDefaults() {
    const ext = (0, GetConfiguration_1.GetCurrentExtensionConfiguration)();
    const keys = [
        'useSystemClipboard', 'easyMotion', 'incSearch', 'hlSearch',
        'insertModeKeyBindings', 'normalModeKeyBindingsNonRecursive',
        'visualModeKeyBindingsNonRecursive', 'leader', 'handleKeys',
        'surround', 'sneak', 'smartcase', 'ignorecase', 'camelCaseMotion', 'preset'
    ];
    for (const key of keys) {
        await ext.update(key, undefined, vscode.ConfigurationTarget.Global);
    }
    Logger_1.Logger.info('Vimanco settings reset to defaults.');
}
function updateStatusBar(preset) {
    statusBarItem.text = `$(vm) Vimanco [${preset}]`;
    statusBarItem.tooltip = `Vimanco is active — preset: ${preset}\nClick to update Vim settings`;
}
function activate(context) {
    Logger_1.Logger.init(context);
    (0, GetVimExtensionVersion_1.GetVimExtensionVersion)();
    Logger_1.Logger.info('Vimanco extension activated.');
    // Status bar
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'vimanco.updateVim';
    const presetName = (0, GetConfiguration_1.GetCurrentExtensionConfiguration)().get('preset') ?? 'default';
    updateStatusBar(presetName);
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
    // Apply settings on startup
    applyVimSettings().catch(err => Logger_1.Logger.error(`Failed to apply settings on activation: ${err}`));
    const disposableUpdate = vscode.commands.registerCommand('vimanco.updateVim', async () => {
        let success = false;
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Vimanco: Applying Vim settings\u2026',
            cancellable: false,
        }, async () => {
            success = await applyVimSettings();
        });
        if (success) {
            vscode.window.showInformationMessage('Vimanco: Vim settings updated successfully.');
        }
    });
    const disposableReset = vscode.commands.registerCommand('vimanco.resetToDefaults', async () => {
        const confirm = await vscode.window.showWarningMessage('Vimanco: Reset all settings to defaults?', { modal: true }, 'Reset');
        if (confirm === 'Reset') {
            await resetToDefaults();
            await applyVimSettings();
            vscode.window.showInformationMessage('Vimanco: Settings reset to defaults.');
        }
    });
    const disposableConfigChange = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('vimanco')) {
            Logger_1.Logger.info('Vimanco configuration changed \u2014 re-applying Vim settings.');
            applyVimSettings().catch(err => Logger_1.Logger.error(`Failed to re-apply settings: ${err}`));
        }
    });
    context.subscriptions.push(disposableUpdate, disposableReset, disposableConfigChange);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCurrentExtensionConfiguration = exports.UpdateSetting = exports.GetConfiguration = void 0;
const vscode = __importStar(__webpack_require__(1));
function GetConfiguration() {
    return vscode.workspace.getConfiguration('vim');
}
exports.GetConfiguration = GetConfiguration;
async function UpdateSetting(config, section, value) {
    if (value === undefined) {
        return;
    }
    await config.update(section, value, vscode.ConfigurationTarget.Global);
}
exports.UpdateSetting = UpdateSetting;
function GetCurrentExtensionConfiguration() {
    return vscode.workspace.getConfiguration("vimanco");
}
exports.GetCurrentExtensionConfiguration = GetCurrentExtensionConfiguration;


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetVimExtensionVersion = void 0;
const vscode = __importStar(__webpack_require__(1));
const Logger_1 = __webpack_require__(4);
function GetVimExtensionVersion() {
    const extension = vscode.extensions.getExtension("vscodevim.vim");
    if (extension) {
        const packageJson = extension.packageJSON;
        Logger_1.Logger.info(`VSCodeVim detected — name: ${packageJson.name}, version: ${packageJson.version}`);
    }
    else {
        Logger_1.Logger.warn("VSCodeVim extension not found.");
    }
}
exports.GetVimExtensionVersion = GetVimExtensionVersion;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = void 0;
const vscode_1 = __webpack_require__(1);
class Logger {
    static output;
    static init(context) {
        Logger.output = vscode_1.window.createOutputChannel('Vimanco', { log: true });
        context.subscriptions.push(Logger.output);
    }
    static error(msg) {
        if (Logger.output) {
            Logger.output.error(msg);
        }
        else {
            console.error(msg);
        }
    }
    static warn(msg) {
        if (Logger.output) {
            Logger.output.warn(msg);
        }
        else {
            console.warn(msg);
        }
    }
    static info(msg) {
        if (Logger.output) {
            Logger.output.info(msg);
        }
        else {
            console.log(msg);
        }
    }
    static debug(msg) {
        if (Logger.output) {
            Logger.output.debug(msg);
        }
        else {
            console.debug(msg);
        }
    }
    static trace(msg) {
        if (Logger.output) {
            Logger.output.trace(msg);
        }
        else {
            console.trace(msg);
        }
    }
}
exports.Logger = Logger;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPreset = void 0;
const presets = {
    minimal: {
        useSystemClipboard: true,
        easyMotion: false,
        incSearch: false,
        hlSearch: false,
        surround: false,
        sneak: false,
        smartcase: false,
        ignorecase: false,
        camelCaseMotion: false,
    },
    default: {
        useSystemClipboard: true,
        easyMotion: true,
        incSearch: true,
        hlSearch: true,
        surround: true,
        sneak: false,
        smartcase: true,
        ignorecase: true,
        camelCaseMotion: false,
    },
    full: {
        useSystemClipboard: true,
        easyMotion: true,
        incSearch: true,
        hlSearch: true,
        surround: true,
        sneak: true,
        smartcase: true,
        ignorecase: true,
        camelCaseMotion: true,
    },
};
function getPreset(name) {
    return presets[name] ?? presets['default'];
}
exports.getPreset = getPreset;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map
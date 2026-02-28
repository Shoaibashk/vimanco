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
async function applyVimSettings() {
    const vimExt = vscode.extensions.getExtension('vscodevim.vim');
    if (!vimExt) {
        vscode.window.showWarningMessage('Vimanco: VSCodeVim extension is not installed. Settings were not applied.');
        return false;
    }
    const userSettings = (0, GetConfiguration_1.GetConfiguration)();
    const currentExtension = (0, GetConfiguration_1.GetCurrentExtensionConfiguration)();
    try {
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'useSystemClipboard', currentExtension.get('useSystemClipboard'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'easymotion', currentExtension.get('easyMotion'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'incsearch', currentExtension.get('incSearch'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'hlsearch', currentExtension.get('hlSearch'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'insertModeKeyBindings', currentExtension.get('insertModeKeyBindings'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'normalModeKeyBindingsNonRecursive', currentExtension.get('normalModeKeyBindingsNonRecursive'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'leader', currentExtension.get('leader'));
        await (0, GetConfiguration_1.UpdateSetting)(userSettings, 'handleKeys', currentExtension.get('handleKeys'));
    }
    catch (err) {
        Logger_1.Logger.error(`Failed to apply Vim settings: ${err}`);
        vscode.window.showWarningMessage(`Vimanco: Failed to apply settings — ${err}`);
        return false;
    }
    Logger_1.Logger.info('Vim settings updated from Vimanco configuration.');
    return true;
}
function activate(context) {
    Logger_1.Logger.init(context);
    (0, GetVimExtensionVersion_1.GetVimExtensionVersion)();
    Logger_1.Logger.info('Vimanco extension activated.');
    // Apply settings on startup
    applyVimSettings().catch(err => Logger_1.Logger.error(`Failed to apply settings on activation: ${err}`));
    const disposableCommand = vscode.commands.registerCommand('vimanco.updateVim', async () => {
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
    const disposableConfigChange = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('vimanco')) {
            Logger_1.Logger.info('Vimanco configuration changed \u2014 re-applying Vim settings.');
            applyVimSettings().catch(err => Logger_1.Logger.error(`Failed to re-apply settings: ${err}`));
        }
    });
    context.subscriptions.push(disposableCommand, disposableConfigChange);
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
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
function activate(context) {
    Logger_1.Logger.init();
    (0, GetVimExtensionVersion_1.GetVimExtensionVersion)();
    console.log('Congratulations, your extension "vimanco" is now active!');
    const userSettings = (0, GetConfiguration_1.GetConfiguration)();
    let disposable = vscode.commands.registerCommand('vimanco.updateVim', async () => {
        const currentExtension = (0, GetConfiguration_1.GetCurrentExtensionConfiguration)();
        if (userSettings.has("vim")) {
            await (0, GetConfiguration_1.UpdateSetting)(userSettings, "vim.useSystemClipboard", currentExtension.get("UseSystemClipboard"));
            await (0, GetConfiguration_1.UpdateSetting)(userSettings, "vim.easymotion", currentExtension.get("EasyMotion"));
            await (0, GetConfiguration_1.UpdateSetting)(userSettings, "vim.incsearch", currentExtension.get("IncSearch"));
            await (0, GetConfiguration_1.UpdateSetting)(userSettings, "vim.hlsearch", currentExtension.get("HlSearch"));
            await (0, GetConfiguration_1.UpdateSetting)(userSettings, "vim.insertModeKeyBindings", currentExtension.get("InsertModeKeyBindings"));
            await (0, GetConfiguration_1.UpdateSetting)(userSettings, "vim.normalModeKeyBindingsNonRecursive", currentExtension.get("NormalModeKeyBindingsNonRecursive"));
            await (0, GetConfiguration_1.UpdateSetting)(userSettings, "vim.leader", currentExtension.get("Leader"));
            await (0, GetConfiguration_1.UpdateSetting)(userSettings, "vim.handleKeys", currentExtension.get("HandleKeys"));
        }
        vscode.window.showInformationMessage("Updated User Settings");
    });
    context.subscriptions.push(disposable);
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
    return vscode.workspace.getConfiguration();
}
exports.GetConfiguration = GetConfiguration;
async function UpdateSetting(config, section, value) {
    return await config.update(section, value, true);
}
exports.UpdateSetting = UpdateSetting;
function GetCurrentExtensionConfiguration() {
    return vscode.workspace.getConfiguration("Vimanco");
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
async function GetVimExtensionVersion() {
    const extension = vscode.extensions.getExtension("vscodevim.vim");
    if (extension) {
        const packageJson = extension.packageJSON;
        console.log("Extension Name:", packageJson.name);
        console.log("Extension Version:", packageJson.version);
        console.log("Extension Description:", packageJson.description);
    }
    else {
        console.error("Extension not found.");
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
    static init() {
        Logger.output = vscode_1.window.createOutputChannel('Vim', { log: true });
    }
    static error(msg) {
        Logger.output.error(msg);
    }
    static warn(msg) {
        Logger.output.warn(msg);
    }
    static info(msg) {
        Logger.output.info(msg);
    }
    static debug(msg) {
        Logger.output.debug(msg);
    }
    static trace(msg) {
        Logger.output.trace(msg);
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
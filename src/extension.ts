

import * as vscode from 'vscode';
import { GetConfiguration, GetCurrentExtensionConfiguration, UpdateSetting } from './utils/GetConfiguration';
import { GetVimExtensionVersion } from './utils/GetVimExtensionVersion';
import { Logger } from './utils/Logger';



export function activate(context: vscode.ExtensionContext) {




	Logger.init();


	GetVimExtensionVersion();
	console.log('Congratulations, your extension "vimanco" is now active!');


	const userSettings = GetConfiguration();
	let disposable = vscode.commands.registerCommand('vimanco.updateVim', async () => {
		const currentExtension = GetCurrentExtensionConfiguration();

		if (userSettings.has("vim")) {
			await UpdateSetting(
				userSettings,
				"vim.useSystemClipboard",
				currentExtension.get("UseSystemClipboard")
			);
			await UpdateSetting(
				userSettings,
				"vim.easymotion",
				currentExtension.get("EasyMotion")
			);
			await UpdateSetting(
				userSettings,
				"vim.incsearch",
				currentExtension.get("IncSearch")
			);
			await UpdateSetting(
				userSettings,
				"vim.hlsearch",
				currentExtension.get("HlSearch")
			);
			await UpdateSetting(
				userSettings,
				"vim.insertModeKeyBindings",
				currentExtension.get("InsertModeKeyBindings")
			);
			await UpdateSetting(
				userSettings,
				"vim.normalModeKeyBindingsNonRecursive",
				currentExtension.get("NormalModeKeyBindingsNonRecursive")
			);
			await UpdateSetting(
				userSettings,
				"vim.leader",
				currentExtension.get("Leader")
			);
			await UpdateSetting(
				userSettings,
				"vim.handleKeys",
				currentExtension.get("HandleKeys")
			);
		}
		vscode.window.showInformationMessage("Updated User Settings");
	});

	context.subscriptions.push(disposable);
}


export function deactivate() { }

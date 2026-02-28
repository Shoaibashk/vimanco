
import * as vscode from 'vscode';
import { GetConfiguration, GetCurrentExtensionConfiguration, UpdateSetting } from './utils/GetConfiguration';
import { GetVimExtensionVersion } from './utils/GetVimExtensionVersion';
import { Logger } from './utils/Logger';

async function applyVimSettings(): Promise<boolean> {
	const vimExt = vscode.extensions.getExtension('vscodevim.vim');
	if (!vimExt) {
		vscode.window.showWarningMessage(
			'Vimanco: VSCodeVim extension is not installed. Settings were not applied.'
		);
		return false;
	}

	const userSettings = GetConfiguration();
	const currentExtension = GetCurrentExtensionConfiguration();

	try {
		await UpdateSetting(userSettings, 'useSystemClipboard', currentExtension.get('useSystemClipboard'));
		await UpdateSetting(userSettings, 'easymotion', currentExtension.get('easyMotion'));
		await UpdateSetting(userSettings, 'incsearch', currentExtension.get('incSearch'));
		await UpdateSetting(userSettings, 'hlsearch', currentExtension.get('hlSearch'));
		await UpdateSetting(userSettings, 'insertModeKeyBindings', currentExtension.get('insertModeKeyBindings'));
		await UpdateSetting(userSettings, 'normalModeKeyBindingsNonRecursive', currentExtension.get('normalModeKeyBindingsNonRecursive'));
		await UpdateSetting(userSettings, 'leader', currentExtension.get('leader'));
		await UpdateSetting(userSettings, 'handleKeys', currentExtension.get('handleKeys'));
	} catch (err) {
		Logger.error(`Failed to apply Vim settings: ${err}`);
		vscode.window.showWarningMessage(`Vimanco: Failed to apply settings — ${err}`);
		return false;
	}

	Logger.info('Vim settings updated from Vimanco configuration.');
	return true;
}

export function activate(context: vscode.ExtensionContext) {
	Logger.init(context);
	GetVimExtensionVersion();
	Logger.info('Vimanco extension activated.');

	// Apply settings on startup
	applyVimSettings().catch(err => Logger.error(`Failed to apply settings on activation: ${err}`));

	const disposableCommand = vscode.commands.registerCommand('vimanco.updateVim', async () => {
		let success = false;
		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: 'Vimanco: Applying Vim settings\u2026',
				cancellable: false,
			},
			async () => {
				success = await applyVimSettings();
			}
		);
		if (success) {
			vscode.window.showInformationMessage('Vimanco: Vim settings updated successfully.');
		}
	});

	const disposableConfigChange = vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('vimanco')) {
			Logger.info('Vimanco configuration changed \u2014 re-applying Vim settings.');
			applyVimSettings().catch(err => Logger.error(`Failed to re-apply settings: ${err}`));
		}
	});

	context.subscriptions.push(disposableCommand, disposableConfigChange);
}

export function deactivate() {}

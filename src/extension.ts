
import * as vscode from 'vscode';
import { GetConfiguration, GetCurrentExtensionConfiguration, UpdateSetting } from './utils/GetConfiguration';
import { GetVimExtensionVersion } from './utils/GetVimExtensionVersion';
import { Logger } from './utils/Logger';
import { getPreset } from './utils/Presets';

let statusBarItem: vscode.StatusBarItem;

function getEffectiveBoolSetting(
	ext: vscode.WorkspaceConfiguration,
	key: keyof ReturnType<typeof getPreset>,
	presetName: string
): boolean {
	const inspected = ext.inspect<boolean>(key);
	// If the user explicitly set the value, use it; otherwise fall back to preset
	if (inspected?.globalValue !== undefined || inspected?.workspaceValue !== undefined) {
		return ext.get<boolean>(key) ?? getPreset(presetName)[key];
	}
	return getPreset(presetName)[key];
}

async function applyVimSettings(): Promise<boolean> {
	const vimExt = vscode.extensions.getExtension('vscodevim.vim');
	if (!vimExt) {
		vscode.window.showWarningMessage(
			'Vimanco: VSCodeVim extension is not installed. Settings were not applied.'
		);
		return false;
	}

	const userSettings = GetConfiguration();
	const ext = GetCurrentExtensionConfiguration();
	const presetName = ext.get<string>('preset') ?? 'default';

	try {
		await UpdateSetting(userSettings, 'useSystemClipboard', getEffectiveBoolSetting(ext, 'useSystemClipboard', presetName));
		await UpdateSetting(userSettings, 'easymotion', getEffectiveBoolSetting(ext, 'easyMotion', presetName));
		await UpdateSetting(userSettings, 'incsearch', getEffectiveBoolSetting(ext, 'incSearch', presetName));
		await UpdateSetting(userSettings, 'hlsearch', getEffectiveBoolSetting(ext, 'hlSearch', presetName));
		await UpdateSetting(userSettings, 'surround', getEffectiveBoolSetting(ext, 'surround', presetName));
		await UpdateSetting(userSettings, 'sneak', getEffectiveBoolSetting(ext, 'sneak', presetName));
		await UpdateSetting(userSettings, 'smartcase', getEffectiveBoolSetting(ext, 'smartcase', presetName));
		await UpdateSetting(userSettings, 'ignorecase', getEffectiveBoolSetting(ext, 'ignorecase', presetName));
		await UpdateSetting(userSettings, 'camelCaseMotion.enable', getEffectiveBoolSetting(ext, 'camelCaseMotion', presetName));
		await UpdateSetting(userSettings, 'insertModeKeyBindings', ext.get('insertModeKeyBindings'));
		await UpdateSetting(userSettings, 'normalModeKeyBindingsNonRecursive', ext.get('normalModeKeyBindingsNonRecursive'));
		await UpdateSetting(userSettings, 'visualModeKeyBindingsNonRecursive', ext.get('visualModeKeyBindingsNonRecursive'));
		await UpdateSetting(userSettings, 'leader', ext.get('leader'));
		await UpdateSetting(userSettings, 'handleKeys', ext.get('handleKeys'));
	} catch (err) {
		Logger.error(`Failed to apply Vim settings: ${err}`);
		vscode.window.showWarningMessage(`Vimanco: Failed to apply settings — ${err}`);
		return false;
	}

	Logger.info(`Vim settings updated from Vimanco configuration (preset: ${presetName}).`);
	updateStatusBar(presetName);
	return true;
}

async function resetToDefaults(): Promise<void> {
	const ext = GetCurrentExtensionConfiguration();
	const keys = [
		'useSystemClipboard', 'easyMotion', 'incSearch', 'hlSearch',
		'insertModeKeyBindings', 'normalModeKeyBindingsNonRecursive',
		'visualModeKeyBindingsNonRecursive', 'leader', 'handleKeys',
		'surround', 'sneak', 'smartcase', 'ignorecase', 'camelCaseMotion', 'preset'
	];
	for (const key of keys) {
		await ext.update(key, undefined, vscode.ConfigurationTarget.Global);
	}
	Logger.info('Vimanco settings reset to defaults.');
}

function updateStatusBar(preset: string): void {
	statusBarItem.text = `$(vm) Vimanco [${preset}]`;
	statusBarItem.tooltip = `Vimanco is active — preset: ${preset}\nClick to update Vim settings`;
}

export function activate(context: vscode.ExtensionContext) {
	Logger.init(context);
	GetVimExtensionVersion();
	Logger.info('Vimanco extension activated.');

	// Status bar
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'vimanco.updateVim';
	const presetName = GetCurrentExtensionConfiguration().get<string>('preset') ?? 'default';
	updateStatusBar(presetName);
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	// Apply settings on startup
	applyVimSettings().catch(err => Logger.error(`Failed to apply settings on activation: ${err}`));

	const disposableUpdate = vscode.commands.registerCommand('vimanco.updateVim', async () => {
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

	const disposableReset = vscode.commands.registerCommand('vimanco.resetToDefaults', async () => {
		const confirm = await vscode.window.showWarningMessage(
			'Vimanco: Reset all settings to defaults?',
			{ modal: true },
			'Reset'
		);
		if (confirm === 'Reset') {
			await resetToDefaults();
			await applyVimSettings();
			vscode.window.showInformationMessage('Vimanco: Settings reset to defaults.');
		}
	});

	const disposableConfigChange = vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('vimanco')) {
			Logger.info('Vimanco configuration changed \u2014 re-applying Vim settings.');
			applyVimSettings().catch(err => Logger.error(`Failed to re-apply settings: ${err}`));
		}
	});

	context.subscriptions.push(disposableUpdate, disposableReset, disposableConfigChange);
}

export function deactivate() {}

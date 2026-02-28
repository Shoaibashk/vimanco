import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Vimanco Extension Test Suite', () => {

	test('Extension is present and can be activated', async () => {
		const ext = vscode.extensions.getExtension('shoaibashk.vimanco');
		assert.ok(ext, 'Extension should be present');
		await ext!.activate();
		assert.strictEqual(ext!.isActive, true, 'Extension should be active after activation');
	});

	test('vimanco.updateVim command is registered', async () => {
		const commands = await vscode.commands.getCommands(true);
		assert.ok(
			commands.includes('vimanco.updateVim'),
			'vimanco.updateVim command should be registered'
		);
	});

	test('Vimanco configuration has expected keys with correct types', () => {
		const config = vscode.workspace.getConfiguration('vimanco');

		assert.strictEqual(typeof config.get('useSystemClipboard'), 'boolean', 'useSystemClipboard should be boolean');
		assert.strictEqual(typeof config.get('easyMotion'), 'boolean', 'easyMotion should be boolean');
		assert.strictEqual(typeof config.get('incSearch'), 'boolean', 'incSearch should be boolean');
		assert.strictEqual(typeof config.get('hlSearch'), 'boolean', 'hlSearch should be boolean');
		assert.strictEqual(typeof config.get('leader'), 'string', 'leader should be string');
		assert.ok(Array.isArray(config.get('insertModeKeyBindings')), 'insertModeKeyBindings should be array');
		assert.ok(Array.isArray(config.get('normalModeKeyBindingsNonRecursive')), 'normalModeKeyBindingsNonRecursive should be array');
		assert.strictEqual(typeof config.get('handleKeys'), 'object', 'handleKeys should be object');
	});

	test('Vimanco configuration has correct default values', () => {
		const config = vscode.workspace.getConfiguration('vimanco');

		assert.strictEqual(config.inspect('useSystemClipboard')?.defaultValue, true);
		assert.strictEqual(config.inspect('easyMotion')?.defaultValue, true);
		assert.strictEqual(config.inspect('incSearch')?.defaultValue, true);
		assert.strictEqual(config.inspect('hlSearch')?.defaultValue, true);
		assert.strictEqual(config.inspect('leader')?.defaultValue, '<space>');
	});

	test('vimanco.updateVim command executes without throwing', async () => {
		await assert.doesNotReject(
			Promise.resolve(vscode.commands.executeCommand('vimanco.updateVim')),
			'updateVim command should not throw'
		);
	});
});

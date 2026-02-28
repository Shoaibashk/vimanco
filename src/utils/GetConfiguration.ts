import * as vscode from "vscode";

export function GetConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration('vim');
}

export async function UpdateSetting(
    config: vscode.WorkspaceConfiguration,
    section: string,
    value: unknown
): Promise<void> {
    if (value === undefined) {
        return;
    }
    await config.update(section, value, vscode.ConfigurationTarget.Global);
}

export function GetCurrentExtensionConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration("vimanco");
}
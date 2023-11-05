import * as vscode from "vscode";

export function GetConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration();
}
export async function UpdateSetting(config: vscode.WorkspaceConfiguration, section: string, value: any) {
    return await config.update(section, value, true);
}
export function GetCurrentExtensionConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration("ImKey");
}
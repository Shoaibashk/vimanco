import * as vscode from "vscode";

export async function UpdateSetting(config: vscode.WorkspaceConfiguration, section: string, value: any) {
    return await config.update(section, value, true);
}

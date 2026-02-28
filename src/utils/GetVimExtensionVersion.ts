import * as vscode from "vscode";
import { Logger } from "./Logger";

export function GetVimExtensionVersion(): void {
    const extension = vscode.extensions.getExtension("vscodevim.vim");

    if (extension) {
        const packageJson = extension.packageJSON;
        Logger.info(`VSCodeVim detected — name: ${packageJson.name}, version: ${packageJson.version}`);
    } else {
        Logger.warn("VSCodeVim extension not found.");
    }
}

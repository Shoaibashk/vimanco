import * as vscode from "vscode";

export async function GetVimExtensionVersion() {
    const extension = vscode.extensions.getExtension("vscodevim.vim");


    if (extension) {
        const packageJson = extension.packageJSON;
        console.log("Extension Name:", packageJson.name);
        console.log("Extension Version:", packageJson.version);
        console.log("Extension Description:", packageJson.description);
    } else {
        console.error("Extension not found.");
    }
}

import { ExtensionContext, LogOutputChannel, window } from 'vscode';

export class Logger {
    private static output: LogOutputChannel;

    public static init(context: ExtensionContext): void {
        Logger.output = window.createOutputChannel('Vimanco', { log: true });
        context.subscriptions.push(Logger.output);
    }

    public static error(msg: string): void {
        if (Logger.output) { Logger.output.error(msg); } else { console.error(msg); }
    }
    public static warn(msg: string): void {
        if (Logger.output) { Logger.output.warn(msg); } else { console.warn(msg); }
    }
    public static info(msg: string): void {
        if (Logger.output) { Logger.output.info(msg); } else { console.log(msg); }
    }
    public static debug(msg: string): void {
        if (Logger.output) { Logger.output.debug(msg); } else { console.debug(msg); }
    }
    public static trace(msg: string): void {
        if (Logger.output) { Logger.output.trace(msg); } else { console.trace(msg); }
    }
}
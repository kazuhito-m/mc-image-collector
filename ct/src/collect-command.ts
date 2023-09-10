import fs from 'fs';
import { Settings } from "./domain/model/config/settings";

const defaultSettings = require('../conf/settings.json');

export class CollectCommand {
    public execute(settingsFilePath?: string): number {
        const settings = this.loadSettingsJsonOf(settingsFilePath);
        if (!settings) {
            console.log('指定された設定ファイルをよめませんでした。path:' + settingsFilePath);
            return 1;
        }

        return 0;
    }

    private loadSettingsJsonOf(settingsFilePath?: string): Settings | undefined {
        if (!settingsFilePath) return defaultSettings;
        if (!fs.existsSync(settingsFilePath)) return undefined;

        const text = fs.readFileSync(settingsFilePath, 'utf-8');
        const json = JSON.parse(text);
        return json;
    }
}

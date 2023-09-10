import { SettingRepository } from "@/domain/model/config/setting-repository";
import { Settings } from "@/domain/model/config/settings";
import fs from 'fs';

const defaultSettings = require('../../../conf/settings.json');

export class SettingDatasource implements SettingRepository {
    public loadOf(filePath?: string): Settings | undefined {
        if (!filePath) return defaultSettings;
        if (!fs.existsSync(filePath)) return undefined;

        const text = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(text);
        return json;
    }
}

import { Settings } from "./settings";

export interface SettingRepository {
    loadOf(filePath?: string): Settings | undefined;
}
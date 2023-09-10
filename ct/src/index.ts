import { Command } from 'commander';
import * as figlet from 'figlet';
import { CollectCommand } from './presentation/command/collect-command';
import { SettingDatasource } from './infrastracture/datasource/config/setting-datasource';

console.log(figlet.textSync("CT Image Collector"));

const packageJson = require('../package.json');

const program = new Command()
    .version(packageJson.version)
    .description("とあるサイトの画像イメージをクローリング＆ダウンロードするコマンドラインツール。")
    .option("-s, --settings  <jsonfilepath>", "設定ファイルのJSONファイル")
    .parse(process.argv);

const options = program.opts();

let exitCode = 0;
if (!options.h && !options.v) {
    try {
        const settingRepository = new SettingDatasource();
        const settings = settingRepository.loadOf(options.settings);
        if (!settings) {
            console.log('指定された設定ファイルをよめませんでした。path:' + options.settings);
            exitCode = 1;
        } else {
            const main = new CollectCommand();
            exitCode = main.execute();
        }
    } catch (error) {
        console.error("予期せぬエラーが発生しました。", error);
        exitCode = 127;
    }
};

process.exit(exitCode);

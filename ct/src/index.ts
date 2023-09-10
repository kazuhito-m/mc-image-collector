import { Command } from 'commander';
import * as figlet from 'figlet';
import { CollectCommand } from './collect-command';

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
        const main = new CollectCommand();
        exitCode = main.execute(options.settings);
    } catch (error) {
        console.error("予期せぬエラーが発生しました。", error);
        exitCode = 127;
    }
};

process.exit(exitCode);

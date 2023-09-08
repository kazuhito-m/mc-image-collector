import { Command } from 'commander';
import * as figlet from 'figlet';

console.log(figlet.textSync("CT Image Collector"));

const packageJson = require('../package.json');

const program = new Command()
    .version(packageJson.version)
    .description("とあるサイトの画像イメージをクローリング＆ダウンロードするコマンドラインツール。")
    .option("-c, --config  <jsonfilepath>", "設定ファイルのJSONファイル")
    .parse(process.argv);

const options = program.opts();

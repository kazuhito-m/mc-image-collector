"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var figlet = require("figlet");
var collect_command_1 = require("./presentation/command/collect-command");
var setting_datasource_1 = require("./infrastracture/datasource/config/setting-datasource");
var di_container_factory_1 = require("./di-container-factory");
console.log(figlet.textSync("CT Image Collector"));
var packageJson = require('../package.json');
var program = new commander_1.Command()
    .version(packageJson.version)
    .description("とあるサイトの画像イメージをクローリング＆ダウンロードするコマンドラインツール。")
    .option("-s, --settings  <jsonfilepath>", "設定ファイルのJSONファイル")
    .parse(process.argv);
var options = program.opts();
var exitCode = 0;
if (!options.h && !options.v) {
    try {
        var settingRepository = new setting_datasource_1.SettingDatasource();
        var settings = settingRepository.loadOf(options.settings);
        if (!settings) {
            console.log('指定された設定ファイルをよめませんでした。path:' + options.settings);
            exitCode = 1;
        }
        else {
            var diContainer = new di_container_factory_1.DIContainerFactory().create(settings);
            var command = diContainer.get(collect_command_1.CollectCommand);
            exitCode = command.execute();
        }
    }
    catch (error) {
        console.error("予期せぬエラーが発生しました。", error);
        exitCode = 127;
    }
}
;
process.exit(exitCode);

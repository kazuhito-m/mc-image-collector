"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIContainerFactory = void 0;
var inversify_1 = require("inversify");
var setting_datasource_1 = require("./infrastracture/datasource/config/setting-datasource");
var named_work_transfer_1 = require("./infrastracture/http-transfer/ct/named-work/named-work-transfer");
var DIContainerFactory = /** @class */ (function () {
    function DIContainerFactory() {
    }
    DIContainerFactory.prototype.create = function (settings) {
        var c = new inversify_1.Container();
        c.bind(Symbol.for('Settings')).toConstantValue(settings);
        c.bind(Symbol.for('CollectCommand')).toSelf();
        c.bind(Symbol.for('SettingRepository')).to(setting_datasource_1.SettingDatasource);
        c.bind(Symbol.for('NamedWorkRepository')).to(named_work_transfer_1.NamedWorkTransfer);
        return c;
    };
    return DIContainerFactory;
}());
exports.DIContainerFactory = DIContainerFactory;

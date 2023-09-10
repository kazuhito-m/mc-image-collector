"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingDatasource = void 0;
var fs_1 = require("fs");
var defaultSettings = require('../../../../conf/settings.json');
var SettingDatasource = /** @class */ (function () {
    function SettingDatasource() {
    }
    SettingDatasource.prototype.loadOf = function (filePath) {
        if (!filePath)
            return defaultSettings;
        if (!fs_1.default.existsSync(filePath))
            return undefined;
        var text = fs_1.default.readFileSync(filePath, 'utf-8');
        var json = JSON.parse(text);
        return json;
    };
    return SettingDatasource;
}());
exports.SettingDatasource = SettingDatasource;

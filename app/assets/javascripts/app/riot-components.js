/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../d.ts/node/node.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.observable = new Riot.Observable();
var RiotBase = (function (_super) {
    __extends(RiotBase, _super);
    function RiotBase() {
        var _this = this;
        _super.call(this);
        this.observable = window.observable;
        this.addEventListener = function (eventName, callback) {
            window.addEventListener(eventName, callback);
        };
        this.route = function (target, delay, callback) {
            if (delay === void 0) { delay = 0; }
            if (callback === void 0) { callback = function () { }; }
            setTimeout(function () {
                _this.observable.trigger('route', target.prototype.tagName);
                callback();
            }, delay);
        };
    }
    return RiotBase;
})(Riot.Element);
var Setting = (function () {
    function Setting() {
    }
    return Setting;
})();
(function () {
    var fs = require('fs');
    Setting.general = JSON.parse(fs.readFileSync('setting.json').toString());
    Setting.language = JSON.parse(fs.readFileSync("language/" + Setting.general.language + ".json").toString());
})();
/// <reference path="../../d.ts/node/node.d.ts" />
var ViewUtil = (function () {
    function ViewUtil() {
    }
    ViewUtil.load = function (path) {
        var fs = require("fs");
        var source = fs.readFileSync("src/views/" + path).toString().replace(/\n/g, "");
        return source;
    };
    return ViewUtil;
})();
/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../base/riot-base.ts" />
/// <reference path="../utils/viewUtil.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var ErApp = (function (_super) {
    __extends(ErApp, _super);
    function ErApp() {
        var _this = this;
        _super.call(this);
        this.observable.on('route', function (tagName) {
            var tag = "<" + tagName + "></" + tagName + ">";
            _this.root.innerHTML = tag;
            riot.mount(tagName);
        });
        this.route(ErTop);
    }
    ErApp = __decorate([
        /// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
        template(ViewUtil.load("er-app.html"))
    ], ErApp);
    return ErApp;
})(RiotBase);
ErApp.register();
/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../base/riot-base.ts" />
/// <reference path="../utils/viewUtil.ts"/>
var ErTop = (function (_super) {
    __extends(ErTop, _super);
    function ErTop() {
        _super.call(this);
    }
    ErTop.prototype.openERD = function (e) {
        var _this = this;
        e.preventDefault();
        FileUtil.openERD(function () { return _this.route(ErWs); });
    };
    ErTop.prototype.createERD = function (e) {
        var _this = this;
        e.preventDefault();
        FileUtil.createERD(function () { return _this.route(ErWs); });
    };
    ErTop.prototype.openRecentERD = function (e) {
        e.preventDefault();
    };
    ErTop = __decorate([
        /// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
        template(ViewUtil.load("er-top.html"))
    ], ErTop);
    return ErTop;
})(RiotBase);
ErTop.register();
/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../base/riot-base.ts" />
/// <reference path="../utils/viewUtil.ts"/>
var ErWsCanvas = (function (_super) {
    __extends(ErWsCanvas, _super);
    function ErWsCanvas() {
        _super.apply(this, arguments);
    }
    ErWsCanvas = __decorate([
        /// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
        template(ViewUtil.load("er-ws-canvas.html"))
    ], ErWsCanvas);
    return ErWsCanvas;
})(RiotBase);
ErWsCanvas.register();
/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../base/riot-base.ts" />
/// <reference path="../utils/viewUtil.ts"/>
var ErWsTable = (function (_super) {
    __extends(ErWsTable, _super);
    function ErWsTable() {
        _super.apply(this, arguments);
    }
    ErWsTable = __decorate([
        /// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
        template(ViewUtil.load("er-ws-table.html"))
    ], ErWsTable);
    return ErWsTable;
})(RiotBase);
ErWsTable.register();
/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../base/riot-base.ts" />
/// <reference path="../utils/viewUtil.ts"/>
var ErWs = (function (_super) {
    __extends(ErWs, _super);
    function ErWs() {
        _super.call(this);
        this.isTableView = false;
    }
    ErWs = __decorate([
        /// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
        template(ViewUtil.load("er-ws.html"))
    ], ErWs);
    return ErWs;
})(RiotBase);
ErWs.register();
/// <reference path="../../d.ts/node/node.d.ts" />
var fs = require('fs');
var remote = require('remote');
var dialog = remote.require('dialog');
var FileUtil = (function () {
    function FileUtil() {
    }
    FileUtil.openERD = function (callback) {
        FileUtil.openDir(Setting.language.string.general.dialog.openERD, function (dirs) {
            if (!dirs) {
                return;
            }
            var dirPath = dirs[0];
            if (!dirPath) {
                return;
            }
            Working.info = JSON.parse(FileUtil.read(dirPath + "/info.json"));
            Working.colors = JSON.parse(FileUtil.read(dirPath + "/colors.json"));
            Working.tables = JSON.parse(FileUtil.read(dirPath + "/tables.json"));
            Working.views = JSON.parse(FileUtil.read(dirPath + "/views.json"));
            Working.relations = JSON.parse(FileUtil.read(dirPath + "/relations.json"));
            callback();
        });
    };
    FileUtil.createERD = function (callback) {
        Working.info = { plugin: 'mysql' };
        Working.colors = [];
        Working.tables = [];
        Working.views = [];
        Working.relations = [];
        callback();
    };
    FileUtil.openDir = function (title, callback) {
        var options = {
            title: title,
            properties: ['openDirectory']
        };
        dialog.showOpenDialog(null, options, callback);
    };
    FileUtil.open = function (filter, callback) {
        if (filter === void 0) { filter = FileUtil.filterERD; }
        if (callback === void 0) { callback = function () { }; }
        var options = {
            title: Setting.language.string.general.dialog.openFile,
            filters: [
                { name: 'ERM Json', extensions: ['json'] },
                { name: 'ERM XML', extensions: ['erm'] }
            ]
        };
        dialog.showOpenDialog(null, options, callback);
    };
    FileUtil.read = function (filePath) {
        return fs.readFileSync(filePath).toString();
    };
    FileUtil.filterERD = [
        { name: 'ERM Json', extensions: ['json'] },
        { name: 'ERM XML', extensions: ['erm'] }
    ];
    return FileUtil;
})();
var Working = (function () {
    function Working() {
    }
    return Working;
})();

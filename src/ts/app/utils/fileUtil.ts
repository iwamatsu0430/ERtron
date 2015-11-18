/// <reference path="../../d.ts/node/node.d.ts" />

let fs      = require('fs');
let remote  = require('remote');
let dialog  = remote.require('dialog');

class FileUtil {

  static filterERD = [
    { name: 'ERM Json', extensions: ['json'] },
    { name: 'ERM XML',  extensions: ['erm'] }
  ];

  static openERD (callback: Function) {
    FileUtil.openDir(Setting.language.string.general.dialog.openERD, (dirs: string[]) => {
      if (!dirs) {
        return;
      }
      let dirPath = dirs[0];
      if (!dirPath) {
        return;
      }
      Working.info = JSON.parse(FileUtil.read(`${dirPath}/info.json`));
      Working.colors = JSON.parse(FileUtil.read(`${dirPath}/colors.json`));
      Working.tables = JSON.parse(FileUtil.read(`${dirPath}/tables.json`));
      Working.views = JSON.parse(FileUtil.read(`${dirPath}/views.json`));
      Working.relations = JSON.parse(FileUtil.read(`${dirPath}/relations.json`));
      callback();
    });
  }

  static createERD (callback: Function) {
    Working.info = {plugin: 'mysql'};
    Working.colors = [];
    Working.tables = [];
    Working.views = [];
    Working.relations = [];
    callback();
  }

  static openDir (title: string, callback: Function) {
    let options = {
       title: title,
       properties: ['openDirectory']
    };
    dialog.showOpenDialog(null, options, callback);
  }

  static open (filter: any = FileUtil.filterERD, callback: Function = () => {}) {
    let options = {
       title: Setting.language.string.general.dialog.openFile,
       filters: [
         { name: 'ERM Json', extensions: ['json'] },
         { name: 'ERM XML', extensions: ['erm'] }
       ]
    };
    dialog.showOpenDialog(null, options, callback);
  }

  static read (filePath: string) {
    return fs.readFileSync(filePath).toString();
  }
}

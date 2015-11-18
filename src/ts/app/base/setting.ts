class Setting {

  static general: any;

  static language: any;
}

(() => {
  let fs = require('fs');
  Setting.general = JSON.parse(fs.readFileSync('setting.json').toString());
  Setting.language = JSON.parse(fs.readFileSync(`language/${Setting.general.language}.json`).toString());
})();

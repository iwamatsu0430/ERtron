var app           = require('app');
var menu          = require('menu');
var BrowserWindow = require('browser-window');
var fs            = require("fs");

var setting = JSON.parse(fs.readFileSync('setting.json').toString());
var language = JSON.parse(fs.readFileSync('language/' + setting.language + '.json').toString());
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  menu.setApplicationMenu(menu.buildFromTemplate([
    {
      label: language.string.menu.app.label,
      submenu: [
        {label: language.string.menu.app.submenu.quit, accelerator: "Command+Q", click: function() {app.quit(); }}
      ]
    },
    {
      label: language.string.menu.file.label,
      submenu: [
        {label: language.string.menu.file.submenu.new, accelerator: "Command+N", click: function() { console.log("New"); }},
        {label: language.string.menu.file.submenu.open, accelerator: "Command+O", click: function() { console.log("Open"); }},
        {label: language.string.menu.file.submenu.openRecent, click: function() { console.log("Open recent"); }},
        {label: language.string.menu.file.submenu.save, accelerator: "Command+S", click: function() { console.log("Save"); }},
        {label: language.string.menu.file.submenu.saveAs, accelerator: "Command+Shift+S", click: function() { console.log("Save as"); }},
        {label: language.string.menu.file.submenu.close, accelerator: "Command+W", click: function() { console.log("Close"); }},
      ]
    },
    {
      label: language.string.menu.view.label,
      submenu: [
        {label: language.string.menu.view.submenu.reload, accelerator: 'Command+R', click: function() { mainWindow.restart(); }},
        {label: language.string.menu.view.submenu.toggleFullScreen, accelerator: 'Ctrl+Command+F', click: function() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); }},
        {label: language.string.menu.view.submenu.toggleDeveloperTools, accelerator: 'Alt+Command+I', click: function() { mainWindow.toggleDevTools(); }}
      ]
    }
  ]));

  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

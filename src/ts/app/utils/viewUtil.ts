/// <reference path="../../d.ts/node/node.d.ts" />

class ViewUtil {

  static load = (path: string): string => {
    let fs = require("fs");
    let source: string = fs.readFileSync("src/views/" + path).toString().replace(/\n/g, "");
    return source;
  }
}

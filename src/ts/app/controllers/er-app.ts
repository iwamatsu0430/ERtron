/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../base/riot-base.ts" />
/// <reference path="../utils/viewUtil.ts"/>

@template(ViewUtil.load("er-app.html"))
class ErApp extends RiotBase {

  constructor () {
    super();
    this.observable.on('route', (tagName: string) => {
      let tag = `<${tagName}></${tagName}>`;
      this.root.innerHTML = tag;
      riot.mount(tagName);
    });
    this.route(ErTop);
  }
}

ErApp.register();

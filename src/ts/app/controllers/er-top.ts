/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../base/riot-base.ts" />
/// <reference path="../utils/viewUtil.ts"/>

@template(ViewUtil.load("er-top.html"))
class ErTop extends RiotBase {

  constructor () {
    super();
  }

  openERD (e: Event) {
    e.preventDefault();
    FileUtil.openERD(() => this.route(ErWs));
  }

  createERD (e: Event) {
    e.preventDefault();
    // TODO(Future) choose plugin
    Working.info = {plugin: 'mysql'};
    FileUtil.createERD(() => this.route(ErWs));
  }

  openRecentERD (e: Event) {
    e.preventDefault();
    // TODO show recently files
  }
}

ErTop.register();

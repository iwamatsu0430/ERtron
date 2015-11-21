/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../base/riot-base.ts" />
/// <reference path="../utils/viewUtil.ts"/>

@template(ViewUtil.load("er-ws.html"))
class ErWs extends RiotBase {

  isMouseDown: boolean = false

  constructor () {
    super();
    this.observable.on('onMouseDownTable', () => this.isMouseDown = true);
  }
}

ErWs.register();

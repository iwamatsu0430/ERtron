/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../base/riot-base.ts" />
/// <reference path="../utils/viewUtil.ts"/>

@template(ViewUtil.load("er-ws-table.html"))
class ErWsTable extends RiotBase {

  constructor () {
    super();
  }

  findPosition (tablePhysicalName: string) {

  }
}

ErWsTable.register();

/// <reference path="../../../../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../../d.ts/node/node.d.ts" />

window.observable = new Riot.Observable();

class RiotBase extends Riot.Element {

  observable = window.observable;

  prototype: any;

  constructor () {
    super();
  }

  addEventListener = (eventName: string, callback: EventListener) => {
    window.addEventListener(eventName, callback);
  }

  route = (target: any, delay: number = 0, callback: Function = () => {}) => {
    setTimeout(() => {
      this.observable.trigger('route', target.prototype.tagName);
      callback();
    }, delay);
  }
}

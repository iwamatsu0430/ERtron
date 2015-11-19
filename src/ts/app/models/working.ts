class Working {

  static info: any;
  static colors: any;
  static tables: any;
  static views: any;
  static relations: any;
  static types: any;

  static findView (tablePhysicalName: string) {
    let target: any = null;
    Working.views.forEach((view: any) => {
      if (tablePhysicalName === view.name) {
        target = view;
      }
    });
    return target;
  }
}

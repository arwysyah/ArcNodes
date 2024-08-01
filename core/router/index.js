class Router {
  constructor(routes, notFoundRoute = "/404") {
    this.routes = routes;
    this.notFoundRoute = notFoundRoute;
    this.result = document.createElement("div");
    this.syncHash = this.syncHash.bind(this);
    this.init();
  }

  init() {
    this.syncHash();
    window.addEventListener("hashchange", this.syncHash);
  }

  syncHash() {
    let hashLocation = document.location.hash.split("#")[1];
    if (!hashLocation) {
      hashLocation = "/";
    }

    let routeHandler = this.routes[hashLocation];
    if (!routeHandler) {
      routeHandler = this.routes[this.notFoundRoute];
    }

    if (
      typeof routeHandler === "function" &&
      routeHandler.prototype &&
      routeHandler.prototype.render
    ) {
      const componentInstance = new routeHandler({ router: this });
      this.result.replaceChildren(componentInstance.render());
      if (componentInstance.componentDidMount) {
        componentInstance.componentDidMount();
      }
    } else if (typeof routeHandler === "function") {
      console.log("hello");
      this.result.replaceChildren(routeHandler());
    } else {
      throw new Error(
        "Invalid route handler: must be a component class or a function returning a DOM node",
      );
    }

    return this.result;
  }

  navigate(path) {
    document.location.hash = `#${path}`;
  }

  refresh() {
    this.syncHash();
  }

  destroy() {
    window.removeEventListener("hashchange", this.syncHash);
  }
}

export default Router;

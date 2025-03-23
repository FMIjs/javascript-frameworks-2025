import { Routes } from "@lit-labs/router";
import { DependencyManager } from "../dependency-manager";
import { INITIAL_URL, ROUTES } from "../di/tokens";

export class Router {
  private _routes: Routes;

  outlet() {
    return this._routes.outlet();
  }

  constructor(dependencyManger: DependencyManager) {
    this._routes = dependencyManger.get(ROUTES);
    const initialUrl = dependencyManger.get(INITIAL_URL);
    this._routes.goto(initialUrl);

    // Create a window service and use DI
    window.addEventListener("popstate", this.popStateHandler);
  }

  navigate(pathname: string) {
    this._routes.goto(pathname);

    // Create a window service and use DI
    window.history.pushState(null, "", pathname);
  }

  private popStateHandler = (event: PopStateEvent) => {
    const { target } = event;
    if (!(target instanceof Window)) return;
    const {
      location: { pathname },
    } = target;
    this.navigate(pathname);
  };
}

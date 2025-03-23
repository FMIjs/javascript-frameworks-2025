import { Routes } from "@lit-labs/router";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { asyncReplace } from "lit/directives/async-replace";
import { AppLink } from "./app-link";
import { AppLogin } from "./app-login";
import { createInstance } from "./directives/create-instance";
import { async } from "./directives/async";
import { DependencyManager } from "./dependency-manager";
import { ROUTES } from "./di/tokens";
import { Router } from "./services/router.service";
import { AppStore, User } from "./types";
import { Store } from "./services/store.service";
import { filter, map, Observable } from "rxjs";

@customElement("app-root")
export class AppRoot extends LitElement {
  router: Router;
  user$: Observable<User | null>;

  constructor(dependencyManger: DependencyManager) {
    super();

    const routes = new Routes(this, [
      {
        path: "/",
        render: () => {
          return html`<h1>Home</h1>`;
        },
      },
      {
        path: "/login",
        render: () => {
          return html`${createInstance(AppLogin)}`;
        },
      },
      {
        path: "/projects",
        render: () => {
          return html`<h1>Projects</h1>`;
        },
      },
      {
        path: "/about",
        render: () => {
          return html`<h1>About</h1>`;
        },
      },
    ]);

    dependencyManger.provide([
      {
        useValue: routes,
        provide: ROUTES,
      },
    ]);

    this.router = dependencyManger.get(Router);
    const store: Store<AppStore> = dependencyManger.get(Store);
    this.user$ = store.select("user");
  }

  render() {
    const username$ = this.user$.pipe(
      filter((val) => !!val),
      map(({ firstName, lastName }) => `${firstName} ${lastName}`)
    );

    console.log(async(username$));

    return html`
      <header>
        <nav>
          ${createInstance(AppLink, { to: "/" }, "Home")}
          ${createInstance(AppLink, { to: "/login" }, "Login")}
          ${createInstance(AppLink, { to: "/projects" }, "Projects")}
          ${createInstance(AppLink, { to: "/about" }, "About")}
        </nav>
        <div>${async(username$)}</div>
      </header>
      <main>${this.router.outlet()}</main>
      <footer>APP FOOTER</footer>
    `;
  }
}

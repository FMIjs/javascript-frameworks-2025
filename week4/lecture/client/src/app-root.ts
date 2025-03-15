import { Routes } from "@lit-labs/router";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AppLink } from "./app-link";
import { createNavigationEvent } from "./app-link";
import { AppLogin } from "./app-login";
import { createInstance } from "./directives/create-instance";

@customElement("app-root")
export class AppRoot extends LitElement {
  private _routes = new Routes(this, [
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

  private navigate = (event: Event) => {
    if (!("detail" in event) || typeof event.detail !== "string") return;
    this._routes.goto(event.detail);
  };

  private popStateHandler = (event: PopStateEvent) => {
    const { target } = event;
    if (!(target instanceof Window)) return;
    const {
      location: { pathname },
    } = target;
    this.navigate(createNavigationEvent(pathname));
  };

  connectedCallback(): void {
    super.connectedCallback();
    this._routes.goto(window.location.pathname);
    window.addEventListener("app-navigate", this.navigate);
    window.addEventListener("popstate", this.popStateHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("app-navigate", this.navigate);
  }

  render() {
    return html`
      <header>
        <!-- <app-link to="/">HOME</app-link>
        <app-link to="/projects">PROJECTS</app-link>
        <app-link to="/about">ABOUT</app-link> -->

        ${createInstance(AppLink, { to: "/" }, "Home")}
        ${createInstance(AppLink, { to: "/login" }, "Login")}
        ${createInstance(AppLink, { to: "/projects" }, "Projects")}
        ${createInstance(AppLink, { to: "/about" }, "About")}
      </header>
      <main>${this._routes.outlet()}</main>
      <footer>APP FOOTER</footer>
    `;
  }
}

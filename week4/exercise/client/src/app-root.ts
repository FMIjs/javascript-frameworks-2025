import { Routes } from "@lit-labs/router";
import { LitElement, html } from "lit";
import "./task-list";
import "./task-form";

export class AppRoot extends LitElement {
  private _routes = new Routes(this, [
    {
      path: "/",
      render: () => {
        return html`
          <task-list></task-list>
        `;
      },
    },
    {
      path: "/todos",
      render: () => {
        return html`
          <h1>TODO some other page</h1>
        `;
      },
    },
  ]);

  private navigate = (event: Event) => {
    if (!("detail" in event) || typeof event.detail !== "string") return;
    this._routes.goto(event.detail);
  };

  connectedCallback(): void {
    super.connectedCallback();
    this._routes.goto(window.location.pathname);
    window.addEventListener("app-navigate", this.navigate);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("app-navigate", this.navigate);
  }

  render() {
    return html`
      <header>
        <a href="/">TASKS</a>
        <a href="/todos">TODOS</a>
      </header>
      <main>${this._routes.outlet()}</main>
      <footer>Some footer content here</footer>
    `;
  }
}

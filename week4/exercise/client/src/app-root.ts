import { Routes } from "@lit-labs/router";
import { LitElement, html } from "lit";

export class AppRoot extends LitElement {
  private _routes = new Routes(this, [
    {
      path: "/",
      render: () => {
        return html`<h1>Tasks</h1>`;
      },
    },
    {
      path: "/add",
      render: () => {
        return html`<h1>Add New Task</h1>`;
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
        <a href="/add">ADD NEW</a>
      </header>
      <main>${this._routes.outlet()}</main>
      <footer>APP FOOTER</footer>
    `;
  }
}

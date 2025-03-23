import { html, LitElement } from "lit-element";
import { customElement, property } from "lit/decorators.js";
import { Router } from "./services/router.service";
import { DependencyManager } from "./dependency-manager";

@customElement("app-link")
export class AppLink extends LitElement {
  router: Router;
  constructor(private dm: DependencyManager) {
    super();
    this.router = dm.get(Router);
  }

  @property({ attribute: true }) to: string = "/";

  clickHandler(e: Event) {
    e.preventDefault();
    this.router.navigate(this.to);
  }

  render() {
    return html`
      <a href=${this.to} @click=${this.clickHandler}>
        <slot></slot>
      </a>
    `;
  }
}

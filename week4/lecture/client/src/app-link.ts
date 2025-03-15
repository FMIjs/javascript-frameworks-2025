import { html, LitElement } from "lit-element";
import { customElement, property } from "lit/decorators.js";

export function createNavigationEvent(to: string) {
  return new CustomEvent("app-navigate", { detail: to });
}

@customElement("app-link")
export class AppLink extends LitElement {
  @property({ attribute: true }) to: string = "/";

  clickHandler(e: Event) {
    e.preventDefault();
    window.dispatchEvent(createNavigationEvent(this.to));
    window.history.pushState(null, "", this.to);
  }

  render() {
    return html`
      <a href=${this.to} @click=${this.clickHandler}>
        <slot></slot>
      </a>
    `;
  }
}

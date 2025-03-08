import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { query } from "lit/decorators.js";
import {
  debounceTime,
  filter,
  fromEvent,
  map,
  mergeMap,
  switchMap,
} from "rxjs";

import { fromFetch } from "rxjs/fetch";

const users$ = fromFetch("https://jsonplaceholder.typicode.com/users").pipe(
  mergeMap((res) => res.json())
);

@customElement("app-root")
export class AppRoot extends LitElement {
  @query("#myInput") myInput!: HTMLInputElement;

  static styles = css`
    :host {
      color: blue;
    }
  `;

  @property()
  name?: string = "World";

  firstUpdated() {
    fromEvent(this.myInput, "input")
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        // debounceTime(500),
        switchMap((filterText) =>
          users$.pipe(
            map((users) => {
              return users.filter((u: any) => u.name.includes(filterText));
            })
          )
        )
      )
      .subscribe((filteredUsers) => {
        console.log(filteredUsers);
      });
  }

  render() {
    return html`
      <p>Hello, ${this.name}!</p>
      <input id="myInput" />
    `;
  }
}

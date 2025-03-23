import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { DependencyManager } from "./dependency-manager";
import { AuthService } from "./services/auth.service";

type LoginFormData = {
  email: string;
  password: string;
};

@customElement("app-login")
export class AppLogin extends LitElement {
  authService: AuthService;

  constructor(dependencyManager: DependencyManager) {
    super();
    this.authService = dependencyManager.get(AuthService);
  }

  submitHandler(event: SubmitEvent) {
    event.preventDefault();
    if (!event.target || !(event.target instanceof HTMLFormElement)) return;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()) as LoginFormData;
    this.authService.login(data).subscribe(console.log);
  }

  render() {
    return html`
      <form @submit=${this.submitHandler}>
        <div>
          <label>Email:</label>
          <input type="text" name="email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <button>Login</button>
      </form>
    `;
  }
}

import { tap } from "rxjs";
import { DependencyManager } from "../dependency-manager";
import { Http } from "./http.server";
import { AppStore, User } from "../types";
import { Store } from "./store.service";

export class AuthService {
  http: Http;
  store: Store<AppStore>;

  constructor(dependencyManager: DependencyManager) {
    this.http = dependencyManager.get(Http);
    this.store = dependencyManager.get(Store);
  }

  login = (body: { email: string; password: string }) => {
    return this.http.post<{ user: User }>("/api/session", body).pipe(
      tap((data) => {
        if (!data.user) return;
        this.store.setValue("user", data.user);
      })
    );
  };

  logout = () => this.http.delete("/api/session");
}

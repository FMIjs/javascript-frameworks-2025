import { DependencyManager } from "../dependency-manager";
import { AuthService } from "../services/auth.service";
import { Http } from "../services/http.server";
import { Router } from "../services/router.service";
import { Store } from "../services/store.service";
import { AppStore } from "../types";
import { API_URL, INITIAL_URL, PLATFORM } from "./tokens";

const apiServer = "http://localhost:8080/api";

const store = new Store<AppStore>({ user: null });

export const dependencyManager = new DependencyManager([
  {
    provide: PLATFORM,
    useValue: "BROWSER",
  },
  {
    useFactory: (dm) => {
      const platform = dm.get(PLATFORM);
      if (platform === "BROWSER") return window.location.pathname;
      return "/";
    },
    provide: INITIAL_URL,
  },
  {
    useValue: apiServer,
    provide: API_URL,
  },
  {
    useClass: Http,
    provide: Http,
  },
  {
    useClass: AuthService,
    provide: AuthService,
  },
  {
    useClass: Router,
    provide: Router,
  },
  {
    provide: Store,
    useValue: store,
  },
]);

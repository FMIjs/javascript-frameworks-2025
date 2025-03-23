import { AppRoot } from "./app-root";
import { dependencyManager } from "./di/manager";
const app = new AppRoot(dependencyManager);
document.body.appendChild(app);

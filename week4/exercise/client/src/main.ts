import { AppRoot } from "./app-root";

// Define the custom element
customElements.define('app-root', AppRoot);

// Create and append the element using the custom element tag
const app = document.createElement('app-root');
document.body.appendChild(app);

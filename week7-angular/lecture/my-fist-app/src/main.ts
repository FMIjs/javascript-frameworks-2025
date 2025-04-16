import { bootstrapApplication } from '@angular/platform-browser';
import { appProviders, msalInstanceFactory } from './app/app.config';
import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

async function main() {
  const msalInstance = msalInstanceFactory();
  await msalInstance.initialize(); // ✅ Required for MSAL v3+

  return bootstrapApplication(AppComponent, {
    providers: appProviders(msalInstance),
  });
}

main().catch((err) => console.error(err));

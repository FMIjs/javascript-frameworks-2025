import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { API_URL } from '../injection-tokens';
import { UserService } from './user.service';

export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '7ab86676-5435-4189-9129-9f9e36b73df1', // 👈 Replace with your Azure AD App's Client ID
      authority:
        'https://login.microsoftonline.com/b52448df-69c9-4262-9a11-d4b7c6de36fc', // 👈 Replace with your Tenant ID
      redirectUri: 'http://localhost:4200',
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    },
  });
}

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideHttpClient(),
//     MsalService,
//     {
//       provide: MSAL_INSTANCE,
//       useFactory: MSALInstanceFactory,
//     },
//   ],
// };

export const appProviders = (msalInstance: IPublicClientApplication) => [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideHttpClient(),
  MsalService,
  {
    provide: API_URL,
    useValue: 'http://localhost:8080/api',
  },
  {
    provide: MSAL_INSTANCE,
    useValue: msalInstance,
  },
];

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FlowerStorageService } from './services/flower-storage.service';
import { LocalStorageService } from './services/local-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    FlowerStorageService,
    LocalStorageService
  ],
};

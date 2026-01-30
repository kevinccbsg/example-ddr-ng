import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DdrTranslateService } from 'ddr-ng';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const translateService = inject(DdrTranslateService);
      return translateService.getData(`/i18n/`, 'es');
    }),
  ]
};

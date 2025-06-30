import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { jwtAuthenticationInterceptor, unauthorizedInterceptor } from '@bernardo-mg/authentication';
import Aura from '@primeng/themes/aura';
import { environment } from 'environments/environment';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtAuthenticationInterceptor(environment.apiUrl), unauthorizedInterceptor(environment.apiUrl)])
    ),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.app-dark' }
      }
    })
  ]
};

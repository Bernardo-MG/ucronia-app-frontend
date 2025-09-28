import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { jwtAuthenticationInterceptor, unauthorizedInterceptor } from '@bernardo-mg/authentication';
import Aura from '@primeng/themes/aura';
import { environment } from 'environments/environment';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { dateInterceptor } from '@bernardo-mg/request';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        jwtAuthenticationInterceptor(environment.apiUrl), 
        unauthorizedInterceptor(environment.apiUrl), 
        dateInterceptor()])
    ),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.app-dark' }
      }
    })
  ]
};

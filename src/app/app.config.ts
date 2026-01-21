import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { jwtAuthenticationInterceptor, unauthorizedInterceptor } from '@bernardo-mg/authentication';
import { dateInterceptor, errorInterceptor } from '@bernardo-mg/request';
import Aura from '@primeng/themes/aura';
import { UCRONIA_API_BASE_URL } from '@ucronia/api';
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        jwtAuthenticationInterceptor(environment.apiUrl),
        unauthorizedInterceptor(environment.apiUrl),
        dateInterceptor(),
        errorInterceptor()
      ])
    ),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.app-dark' }
      }
    }),
    {
      provide: UCRONIA_API_BASE_URL,
      useValue: environment.apiUrl
    }
  ]
};

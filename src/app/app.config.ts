import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { jwtAuthenticationInterceptor, unauthorizedInterceptor } from '@bernardo-mg/authentication';
import { routes } from './app.routes';
import { environment } from 'environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtAuthenticationInterceptor(environment.apiUrl), unauthorizedInterceptor(environment.apiUrl)])
    )
  ]
};

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { jwtAuthenticationInterceptor } from './core/authentication/interceptors/jwt-authentication.interceptor';
import { unauthorizedInterceptor } from './core/authentication/interceptors/unauthorized.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtAuthenticationInterceptor, unauthorizedInterceptor])
    )
  ]
};

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthContainer } from '../services/auth.service';

/**
 * Unauthorized error interceptor. Logs out the user in session on an authorization error.
 */
@Injectable()
export class UnauthorizedErrorInterceptor implements HttpInterceptor {

  constructor(
    private authContainer: AuthContainer
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {

      const isApiUrl = request.url.startsWith(environment.apiUrl);

      if (isApiUrl) {
        // It is a request to our API

        if (error.status === 401) {
          // Unauthenticated
          // Logs out
          // this.authContainer.logout();
          // location.reload();
        }

        return throwError(() => error);
      } else {
        // External API
        return throwError(() => error);
      }
    }))
  }

}

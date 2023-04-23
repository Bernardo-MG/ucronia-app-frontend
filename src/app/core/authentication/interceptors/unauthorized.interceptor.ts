import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { SecurityContainer } from '../services/security-container.service';

/**
 * Unauthorized error interceptor. Logs out the user in session on an authorization error.
 */
@Injectable()
export class UnauthorizedErrorInterceptor implements HttpInterceptor {

  constructor(
    private securityContainer: SecurityContainer
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {

      const isApiUrl = request.url.startsWith(environment.apiUrl);

      if (isApiUrl) {
        // It is a request to our API

        if (error.status === 401) {
          // Unauthenticated
          // Logs out
          this.securityContainer.reset();
          location.reload();
        }

        const errorMessage = error.error.message || error.statusText;
        return throwError(() => new Error(errorMessage));
      } else {
        // External API
        return throwError(() => error);
      }
    }))
  }

}

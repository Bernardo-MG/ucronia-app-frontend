import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Unauthorized error interceptor. Logs out the user in session on an authorization error.
 */
export const unauthorizedInterceptor = (apiUrl: string): HttpInterceptorFn => {
  return (req, next) => {
    return next(req).pipe(catchError(error => {
      const isApiUrl = req.url.startsWith(apiUrl);

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
    }));
  };
};

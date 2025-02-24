import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthContainer } from '../services/auth-container';

const tokenHeaderKey = 'Authorization';
const tokenHeaderIdentifier = 'Bearer';

/**
 * JWT authentication interceptor. Adds the bearer authentication token to all requests to
 * API requests, as long as the user in session is correctly logged in.
 */
export const jwtAuthenticationInterceptor = (apiUrl: string): HttpInterceptorFn => {
  return (req, next) => {
    const authContainer = inject(AuthContainer);
    let authReq;

    const isApiUrl = req.url.startsWith(apiUrl);

    if (isApiUrl) {
      // It is a request to our API

      // Acquire the current user token
      const logged = authContainer.logged;
      const token = authContainer.token;

      if (logged && token) {
        // Has token
        // It is added to the request
        authReq = req.clone({ headers: req.headers.set(tokenHeaderKey, `${tokenHeaderIdentifier} ${token}`) });
      } else {
        // No token
        // No changes to request
        authReq = req;
      }
    } else {
      // External API
      authReq = req;
    }

    return next(authReq);
  };
};

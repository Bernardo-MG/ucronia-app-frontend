import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthContainer } from '../services/auth.service';


const tokenHeaderKey = 'Authorization';
const tokenHeaderIdentifier = 'Bearer'

/**
 * JWT authentication interceptor. Adds the bearer authentication token to all request to
 * API requests, as long as the user in session is correctly logged in.
 */
export const jwtAuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authContainer = inject(AuthContainer);
  let authReq;

  const isApiUrl = req.url.startsWith(environment.apiUrl);

  if (isApiUrl) {
    // It is a request to our API

    // Acquire the current user token
    const logged = authContainer.isLogged();
    const token = authContainer.getToken();

    if ((logged) && (token)) {
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
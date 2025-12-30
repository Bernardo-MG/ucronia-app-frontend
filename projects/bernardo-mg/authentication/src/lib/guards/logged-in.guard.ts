import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';

/**
 * Logged in guard. Allows access only if the user in session is logged in. Otherwise redirects
 * to the login form.
 */
export const LoggedInGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService)
  const loginRoute = '/login';
  let response: boolean | UrlTree;

  if (authService.logged || state.url === loginRoute) {
    // Logged in
    response = true;
  } else {
    // Not logged in
    // Redirect to login
    const params = { queryParams: state.url !== loginRoute ? { returnUrl: state.url } : {} };
    response = router.createUrlTree([loginRoute], params);
  }

  return response;
}

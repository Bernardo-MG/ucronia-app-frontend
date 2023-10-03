import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthContainer } from '../services/auth.service';

/**
 * Logged in guard. Allows access only if the user in session is logged in. Otherwise redirects
 * to the login form.
 */
export const LoggedInGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authContainer = inject(AuthContainer)
  const loginRoute = '/login';
  let active;

  if (authContainer.isLogged()) {
    // Logged in
    active = true;
  } else {
    // Not logged in
    // Redirect to login

    // Prepare URL redirection for successful login
    let params;
    if ((state.url.length) && (state.url.split('?')[0] !== loginRoute)) {
      params = { queryParams: { returnUrl: state.url } };
    } else {
      params = {};
    }

    router.navigate([loginRoute], params);
    active = false;
  }

  return active;
}

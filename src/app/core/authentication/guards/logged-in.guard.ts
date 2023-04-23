import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityContainer } from '../services/security-container.service';

/**
 * Logged in guard. Allows access only if the user in session is logged in. Otherwise redirects
 * to the login form.
 */
export const LoggedInGuard = () => {
  const router = inject(Router);
  const securityContainer = inject(SecurityContainer)
  const logged = securityContainer.getStatus().logged;
  const loginRoute = '/login';
  let active;

  if (logged) {
    // Logged in
    active = true;
  } else {
    // Not logged in
    // Redirect to login
    if (router.routerState.snapshot.url.split('?')[0] !== loginRoute) {
      router.navigate([loginRoute], { queryParams: { returnUrl: router.routerState.snapshot.url } });
    }
    active = false;
  }

  return active;
}

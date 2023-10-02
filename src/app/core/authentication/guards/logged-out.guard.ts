import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuhtContainer } from '../services/auth.service';

/**
 * Logged out guard. Allows access only if the user in session is logged out. Otherwise redirects
 * to the app root URL.
 */
export const LoggedOutGuard = () => {
  const router = inject(Router);
  const authContainer = inject(AuhtContainer)
  const homeRoute = '/';
  let active;

  if (authContainer.isLogged()) {
    // Logged in
    // Redirect to home
    active = false;
    router.navigate([homeRoute]);
  } else {
    // Not logged in
    active = true;
  }

  return active;
}

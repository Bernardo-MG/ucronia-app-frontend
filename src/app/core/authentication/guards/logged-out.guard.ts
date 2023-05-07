import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Logged out guard. Allows access only if the user in session is logged out. Otherwise redirects
 * to the app root URL.
 */
export const LoggedOutGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService)
  const logged = authService.isLogged();
  const homeRoute = '/';
  let active;

  if (logged) {
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

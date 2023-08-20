import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Logged in guard. Allows access only if the user in session is logged in. Otherwise redirects
 * to the login form.
 */
export const ResourceGuard = (resource: string) => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService)
    const loginRoute = '/login';
    let active;

    if (authService.hasPermission(resource, "view")) {
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
}

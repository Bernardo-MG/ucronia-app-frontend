import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

/**
 * Logged out guard. Allows access only if the user in session is logged out.
 */
export const LoggedOutGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const rootRoute = '/';
  let response: boolean | UrlTree;

  if (state.url === rootRoute) {
    response = true;
  } else if (authService.logged) {
    // Redirect logged-in users to root
    response = router.createUrlTree([rootRoute]);
  } else {
    response = true;
  }

  return response;
};

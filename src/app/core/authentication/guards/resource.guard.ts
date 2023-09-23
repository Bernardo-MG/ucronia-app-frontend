import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Resource guard. Allows access only if the user has view permission for the resource.
 * Otherwise it redirects to the root.
 */
export const ResourceGuard = (resource: string) => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService)
    const rootRoute = '/';
    let active;

    if (authService.hasPermission(resource, "view")) {
      // Logged in
      active = true;
    } else {
      // No permission
      // Redirect to root
      router.navigate([rootRoute], {});
      active = false;
    }

    return active;
  }
}
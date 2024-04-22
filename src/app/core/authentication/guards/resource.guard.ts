import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthContainer } from '../services/auth.service';

/**
 * Resource guard. Allows access only if the user has the received resource permission.
 * Otherwise it redirects to the root.
 */
export const ResourceGuard = (resource: string, action: string) => {
  return () => {
    const router = inject(Router);
    const authContainer = inject(AuthContainer)
    const rootRoute = '/';
    let active;

    if (authContainer.hasPermission(resource, action)) {
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
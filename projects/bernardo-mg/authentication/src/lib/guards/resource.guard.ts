import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Permission } from '../models/permission';

/**
 * Resource guard. Allows access only if the user has the received resource permission.
 * Otherwise redirects to the root.
 */
export const ResourceGuard = (permission: Permission) => {
  return (): boolean | UrlTree => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const rootRoute = '/';
    let response: boolean | UrlTree;

    if (authService.hasPermission(permission.resource, permission.action)) {
      response = true;
    } else {
      // Redirect to root
      response = router.createUrlTree([rootRoute]);
    }

    return response;
  };
};

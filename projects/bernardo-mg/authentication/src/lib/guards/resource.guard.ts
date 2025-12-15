import { inject } from '@angular/core';
import { RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

/**
 * Resource guard. Allows access only if the user has the received resource permission.
 * Otherwise it redirects to the root.
 */
export const ResourceGuard = (resource: string, action: string) => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService)
    let response;

    if (authService.hasPermission(resource, action)) {
      // Logged in
      response = true;
    } else {
      // No permission
      // Redirect to root
      const rootPath = router.parseUrl('/');
      response = new RedirectCommand(rootPath);
    }

    return response;
  }
}
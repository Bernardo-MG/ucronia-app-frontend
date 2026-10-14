import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { librarySettingsPermissions } from './library-settings-permissions';

export const LibrarySettingsGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.hasAnyPermission(librarySettingsPermissions)
    || router.createUrlTree(['/']);
};

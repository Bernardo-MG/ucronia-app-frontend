import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { settingsPermissions } from './settings-permissions';

export const SettingsGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.hasAnyPermission(settingsPermissions)
    || router.createUrlTree(['/']);
};
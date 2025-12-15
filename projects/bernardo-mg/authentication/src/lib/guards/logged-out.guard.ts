import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

/**
 * Logged out guard. Allows access only if the user in session is logged out.
 */
export const LoggedOutGuard = () => {
  const authService = inject(AuthService)
  return !authService.logged;
}

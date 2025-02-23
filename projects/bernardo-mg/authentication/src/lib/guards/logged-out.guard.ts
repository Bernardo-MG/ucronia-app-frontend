import { inject } from '@angular/core';
import { AuthContainer } from '../services/auth.service';

/**
 * Logged out guard. Allows access only if the user in session is logged out.
 */
export const LoggedOutGuard = () => {
  const authContainer = inject(AuthContainer)
  return !authContainer.isLogged();
}

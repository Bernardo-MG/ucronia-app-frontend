import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationContainer } from '../service/authentication-container.service';

/**
 * Logged in guard. Allows access only if the user in session is logged in. Otherwise redirects
 * to the login form.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  private loginUrl = '/login';

  constructor(
    private router: Router,
    private authenticationContainer: AuthenticationContainer
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = this.authenticationContainer.getLoginDetails().logged;
    let active;

    if (logged) {
      // Logged in
      active = true;
    } else {
      // Not logged in
      // Redirect to login
      this.router.navigate([this.loginUrl], { queryParams: { returnUrl: state.url } });
      active = false;
    }

    return active;
  }

}

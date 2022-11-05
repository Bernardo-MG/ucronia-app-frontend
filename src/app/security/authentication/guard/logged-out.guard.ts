import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationContainer } from '../service/authentication-container.service';

/**
 * Logged out guard. Allows access only if the user in session is logged out. Otherwise redirects
 * to the app root URL.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {

  private homeUrl = '/';

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
      // Redirect to home
      active = false;
      this.router.navigate([this.homeUrl]);
    } else {
      // Not logged in
      active = true;
    }

    return active;
  }

}

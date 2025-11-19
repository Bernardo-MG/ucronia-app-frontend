import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { LoginForm } from '../login-form/login-form';
import { LoginService } from '../login-service';
import { LoginRequest } from '../models/login-request';

/**
 * Login view component. Smart component for building the login UI. Wraps the login component.
 * 
 * ## Failure message
 * 
 * If the login request fails the failed field will be set to true. This will show the error
 * message.
 * 
 * ## Return URL
 * 
 * If the URL contains the returnUrl property, then the client will be redirected to it on a 
 * succesful login. This property should contain a route valid for the app. If no route is set
 * then the app will be redirected to the root route.
 * 
 * This is done as the user may be redirected to the login at any point in the app.
 */
@Component({
  selector: 'login-view',
  imports: [RouterModule, CardModule, LoginForm],
  templateUrl: './login-view.html'
})
export class LoginView {

  private readonly service = inject(LoginService);

  private readonly router = inject(Router);

  /**
   * Failed login flag.
   */
  public failedLogin = false;

  /**
   * Waiting flag. Shows the loading visual cue and disables the form. Its status depends on the login request.
   */
  public waiting = false;

  /**
   * Remember me flag.
   */
  private rememberMe = false;

  /**
   * Return route. Used to redirect after login.
   */
  private readonly returnRoute: string;

  constructor() {
    const route = inject(ActivatedRoute);

    // get return url from route parameters or default to '/'
    this.returnRoute = route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Handler for the login event, fired by the form.
   * 
   * @param login user login info
   */
  public onLogin(login: LoginRequest) {
    // Login request

    // Mark the form as loading
    this.waiting = true;
    this.failedLogin = false;

    this.service.login(login, this.rememberMe)
      .subscribe({
        next: user => {
          // Succesful request

          if (user.logged) {
            // Logged in

            // Redirects to the return route
            this.router.navigate([this.returnRoute]);

            this.failedLogin = false;
          } else {
            this.failedLogin = true;
          }

          // Reactivate form
          this.waiting = false;
        },
        error: error => {
          // Failed request
          this.failedLogin = true;
          // Reactivate form
          this.waiting = false;
        }
      });
  }

  /**
   * Handler for the remember me event, fired by the form.
   * 
   * @param remember remember me flag
   */
  public onRememberMe(remember: boolean) {
    this.rememberMe = remember;
  }

  /**
   * Handler for the lost password event, fired by the form.
   */
  public onLostPassword() {
    this.router.navigate(['/password/reset']);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginFormUser } from '../../models/login-form-user';
import { LoginService } from '../../services/login.service';

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
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.sass']
})
export class LoginViewComponent implements OnInit {

  /**
   * Failed login flag.
   */
  public failed = false;

  /**
   * Loading flag. Shows the loading visual cue and disables the form. Its status depends on the login request.
   */
  public loading = false;

  /**
   * Return route. Used to redirect after login.
   */
  private returnRoute: string = '';

  /**
   * Remember me flag.
   */
  private rememberMe = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnRoute = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Handler for the login event, fired by the form.
   * 
   * @param login user login info
   */
  public onLogin(login: LoginFormUser) {
    // Login request

    // Mark the form as loading
    this.loading = true;

    this.loginService.login(login, this.rememberMe)
      .subscribe({
        next: user => {
          // Succesful request

          // The failed flag may be set, if the user didn't log in succesfully
          this.failed = !user.logged;
          if (!this.failed) {
            // No problem
            // Redirects to the return route
            this.router.navigate([this.returnRoute]);
          }

          // Reactivate form
          this.loading = false;
        },
        error: error => {
          // Failed request
          this.failed = true;
          // Reactivate form
          this.loading = false;
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

}

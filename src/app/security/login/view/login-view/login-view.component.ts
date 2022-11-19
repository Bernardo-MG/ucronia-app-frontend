import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginFormUser } from '../../model/login-form-user';
import { LoginService } from '../../service/login.service';

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

  public loading = false;

  /**
   * Return route. Used to redirect after login.
   */
  private returnRoute: string = '';

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

    this.loading = true;

    this.loginService.login(login)
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
        },
        error: error => {
          // Failed request
          this.failed = true;
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
    this.loginService.setRememberMe(remember);
  }

}

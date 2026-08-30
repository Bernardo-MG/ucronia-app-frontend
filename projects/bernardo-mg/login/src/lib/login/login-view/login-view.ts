import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoginEvent, LoginForm } from '../login-form/login-form';
import { LoginService } from '../login-service';

/**
 * Login view component. Smart component for building the login UI. Wraps the login component.
 * 
 * ## Failure message
 * 
 * If the login request fails the failed flag will be set to true. This will show the error
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
  imports: [LoginForm],
  templateUrl: './login-view.html',
  styleUrl: './login-view.sass'
})
export class LoginView {

  private readonly service = inject(LoginService);
  private readonly router = inject(Router);

  public failedLogin = false;
  public waiting = false;

  private rememberMe = false;
  private readonly returnRoute: string;

  public constructor() {
    const route = inject(ActivatedRoute);

    this.returnRoute =
      route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onLogin(login: LoginEvent): void {
    this.waiting = true;
    this.failedLogin = false;

    this.service.login(login, this.rememberMe)
      .pipe(finalize(() => this.waiting = false))
      .subscribe({
        next: user => {
          if (user.logged) {
            this.router.navigateByUrl(this.returnRoute);
          } else {
            this.failedLogin = true;
          }
        },
        error: () => {
          this.failedLogin = true;
        }
      });
  }

  public onRememberMe(remember: boolean): void {
    this.rememberMe = remember;
  }

  public onLostPassword(): void {
    this.router.navigate(['/password/reset']);
  }

}

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoginEvent, LoginForm } from '../login-form/login-form';
import { LoginService } from '../login-service';

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
      .pipe(
        finalize(() => this.waiting = false)
      )
      .subscribe({
        next: user => {
          if (user.logged) {
            this.router.navigate([this.returnRoute]);
            return;
          }

          this.failedLogin = true;
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
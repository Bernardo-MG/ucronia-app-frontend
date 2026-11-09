import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  private readonly service = inject(LoginService);

  public failedLogin = false;
  public loading = false;

  private rememberMe = false;
  private readonly returnRoute: string;

  public constructor() {
    const route = inject(ActivatedRoute);

    this.returnRoute =
      route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onLogin(login: LoginEvent): void {
    this.loading = true;
    this.failedLogin = false;

    this.service.login(login, this.rememberMe)
      .pipe(
        finalize(() => this.loading = false),
        takeUntilDestroyed(this.destroyRef)
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

  public onLostPassword(): void {
    this.router.navigate(['/password/reset']);
  }

  public onRememberMe(remember: boolean): void {
    this.rememberMe = remember;
  }
}
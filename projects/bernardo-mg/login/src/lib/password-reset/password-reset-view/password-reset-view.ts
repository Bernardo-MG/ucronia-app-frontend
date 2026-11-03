
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import { catchError, distinctUntilChanged, EMPTY, finalize, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { PasswordResetForm } from '../password-reset-form/password-reset-form';
import { PasswordResetService } from '../password-reset-service';

/**
 * Password reset. Changes the password for an existing user, this user is identified by a token.
 * 
 * This token is received through the route, and validated before allowing the user to do anything.
 */
@Component({
  imports: [CardModule, BlockUIModule, PasswordResetForm],
  templateUrl: './password-reset-view.html'
})
export class PasswordResetView {

  private readonly destroyRef = inject(DestroyRef);
  private readonly tokenChanged = new Subject<void>();
  private readonly service = inject(PasswordResetService);

  /**
   * Token validation flag. If set to true the component is waiting for the token validation to finish.
   */
  public validatingToken = false;

  public loading = false;

  public status: 'valid_token' | 'invalid_token' | 'finished' = 'valid_token';
  private token = '';

  public failures = new FailureStore();

  constructor() {
    const route = inject(ActivatedRoute);

    route.paramMap.pipe(
      map(params => params.get('token')),
      distinctUntilChanged(),
      switchMap(token => this.validateToken(token)),
      takeUntilDestroyed()
    ).subscribe();
  }

  /**
   * Resets the password. The user is identified by the token.
   * 
   * @param password new password for the user
   */
  public onPasswordReset(password: string): void {
    if (!this.token || this.validatingToken || this.loading) {
      return;
    }

    this.loading = true;

    this.failures.clear();

    this.service.resetPassword(this.token, password)
      .pipe(
        tap({ complete: () => { this.status = 'finished'; } }),
        finalize(() => this.loading = false),
        takeUntil(this.tokenChanged),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
        }
      });
  }

  private validateToken(token: string | null) {
    this.tokenChanged.next();
    this.token = '';
    this.failures.clear();

    if (!token) {
      this.status = 'invalid_token';
      return EMPTY;
    }

    this.status = 'valid_token';
    this.validatingToken = true;
    return this.service.validateToken(token).pipe(
      tap(response => {
        if (!response.valid) {
          this.status = 'invalid_token';
          return;
        }

        this.token = token;
      }),
      catchError(() => {
        this.status = 'invalid_token';
        return EMPTY;
      }),
      finalize(() => this.validatingToken = false)
    );
  }

}

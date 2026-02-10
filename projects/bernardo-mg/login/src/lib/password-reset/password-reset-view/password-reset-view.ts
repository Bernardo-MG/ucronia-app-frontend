
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import { finalize, throwError } from 'rxjs';
import { PasswordResetForm } from '../password-reset-form/password-reset-form';
import { PasswordResetService } from '../password-reset-service';

/**
 * Password reset. Changes the password for an existing user, this user is identified by a token.
 * 
 * This token is received through the route, and validated before allowing the user to do anything.
 */
@Component({
  selector: 'login-password-reset-view',
  imports: [CardModule, BlockUIModule, PasswordResetForm],
  templateUrl: './password-reset-view.html'
})
export class PasswordResetView {

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

    // Validate token taken from route
    route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.validateToken(token);
      }
    });
  }

  /**
   * Resets the password. The user is identified by the token.
   * 
   * @param password new password for the user
   */
  public onPasswordReset(password: string): void {
    this.loading = true;

    this.failures.clear();

    this.service.resetPassword(this.token, password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.status = 'finished';
          console.log('Password reset successfully');
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }

          return throwError(() => error);
        }
      });
  }

  /**
   * Validates the received token.
   * 
   * @param token token to validate
   */
  private validateToken(token: string): void {
    this.validatingToken = true;
    this.service.validateToken(token)
      .pipe(finalize(() => this.validatingToken = false))
      .subscribe({
        next: response => {
          if (!response.valid) {
            this.status = 'invalid_token';
          } else {
            this.token = token;
          }
        },
        error: (error) => {
          return throwError(() => error);
        }
      });
  }

}

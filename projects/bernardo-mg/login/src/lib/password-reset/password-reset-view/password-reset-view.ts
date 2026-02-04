
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { BlockUIModule } from 'primeng/blockui';
import { CardModule } from 'primeng/card';
import { finalize, throwError } from 'rxjs';
import { PasswordResetForm } from '../password-reset-form/password-reset-form';
import { PasswordResetService } from '../password-reset-service';

/**
 * Password reset. Changes the password for an existing user, identified by a token.
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
  public validating = false;

  /**
   * Waiting flag. If set to true the component is waiting for the password change request to finish.
   */
  public waiting = false;

  /**
   * View status.
   */
  public status: 'valid_token' | 'invalid_token' | 'finished' = 'valid_token';

  /**
   * Token for identifying the user.
   */
  private token = '';

  /**
   * Failures when reseting the password.
   */
  public failures = new FailureStore();

  constructor() {
    const route = inject(ActivatedRoute);

    // Validate token from route
    route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.validateToken(token);
      }
    });
  }

  /**
   * Resets the password. The user will be acquired by the backend from the token.
   * 
   * @param password new password for the user
   */
  public onPasswordReset(password: string): void {
    this.waiting = true;

    this.failures.clear();

    // TODO: maybe with a string is enough
    this.service.resetPassword(this.token, password).subscribe({
      next: () => {
        this.status = 'finished';
        this.waiting = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        this.waiting = false;

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
    this.validating = true;
    this.service.validateToken(token)
      .pipe(finalize(() => this.validating = false))
      .subscribe({
        next: response => {
          if (!response.content.valid) {
            this.status = 'invalid_token';
          } else {
            this.token = token;
          }
        },
        error: () => {
          this.status = 'invalid_token';
        }
      });
  }

}

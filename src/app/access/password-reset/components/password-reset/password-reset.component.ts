import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { throwError } from 'rxjs';
import { PasswordReset } from '../../models/password-reset';
import { PasswordResetService } from '../../services/password-reset.service';
import { PasswordResetFormComponent } from '../password-reset-form/password-reset-form.component';

/**
 * Password reset. Changes the password for an existing user, identified by a token.
 * 
 * This token is received through the route, and validated before allowing the user to do anything.
 */
@Component({
  selector: 'login-password-reset',
  standalone: true,
  imports: [CommonModule, PasswordResetFormComponent, WaitingWrapperComponent],
  templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent implements OnInit {

  /**
   * Token validation flag. If set to true the component is waiting for the token validation to finish.
   */
  public validating = false;

  /**
   * Password reset flag. If set to true the component is waiting for the password change request to finish.
   */
  public reseting = false;

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
  public failures = new FieldFailures();

  constructor(
    private route: ActivatedRoute,
    private service: PasswordResetService
  ) { }

  public ngOnInit(): void {
    // Validate token from route
    this.route.paramMap.subscribe(params => {
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
    this.reseting = true;

    this.failures.clear();

    const reset = new PasswordReset();
    reset.password = password;
    this.service.resetPassword(this.token, reset).subscribe({
      next: response => {
        this.status = 'finished';
        this.reseting = false;
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        this.reseting = false;

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
    this.service.validateToken(token).subscribe({
      next: response => {
        if (!response.content.valid) {
          this.status = 'invalid_token';
        } else {
          this.token = token;
        }
        this.validating = false;
      },
      error: response => {
        this.status = 'invalid_token';
        this.validating = false;
      }
    });
  }

}

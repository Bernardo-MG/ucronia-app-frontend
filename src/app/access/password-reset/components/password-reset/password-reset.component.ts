import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
import { PasswordReset } from '../../models/password-reset';
import { PasswordResetService } from '../../services/password-reset.service';

/**
 * Password reset. Changes the password for an existing user, identified by a token.
 * 
 * This token is received through the route, and validated before allowing the user to do anything.
 */
@Component({
  selector: 'login-password-reset',
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
  public failures: { [key: string]: Failure[] } = {};

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

    this.failures = {};

    const reset = new PasswordReset();
    reset.password = password;
    this.service.resetPassword(this.token, reset).subscribe({
      next: response => {
        this.status = 'finished';
        this.reseting = false;
      },
      error: response => {
        // TODO: Unwrap error response automatically
        if (response.error.failures) {
          this.failures = response.error.failures;
        } else {
          this.failures = {};
        }
        this.reseting = false;
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

import { Component } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';
import { PasswordResetRequest } from '../../models/password-reset-request';
import { PasswordResetService } from '../../services/password-reset.service';

/**
 * Password reset form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-request',
  templateUrl: './password-reset-request.component.html'
})
export class PasswordResetRequestComponent {

  /**
   * Finished flag. If set to true the component is finished and allows no furter operation.
   */
  public finished = false;

  /**
   * Password reset flag. If set to true the component is waiting for the password change request to finish.
   */
  public reseting = false;

  /**
   * Failures when reseting the password.
   */
  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private service: PasswordResetService
  ) { }

  /**
   * Handles the password reset request.
   * 
   * @param resetPassword password reset data
   */
  public onPasswordResetRequest(resetPassword: PasswordResetRequest) {
    this.reseting = true;
    this.failures = {};
    this.service.requestResetPassword(resetPassword)
      .subscribe({
        next: response => {
          this.finished = true;
          this.reseting = false;
        },
        error: error => {
          if (error.failures) {
            this.failures = error.failures;
          } else {
            this.failures = {};
          }
          this.reseting = false;
        }
      });
  }

}

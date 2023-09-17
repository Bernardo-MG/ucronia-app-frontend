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

  public finished = false;

  /**
   * Loading flag. Shows the loading visual cue and disables the form. Its status depends on the login request.
   */
  public reseting = false;

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private service: PasswordResetService
  ) { }

  public onPasswordReset(resetPassword: PasswordResetRequest) {
    this.reseting = true;
    this.failures = {};
    this.service.requestResetPassword(resetPassword)
      .subscribe({
        next: response => {
          this.finished = true;
          this.reseting = false;
        },
        error: error => {
          this.reseting = false;
          if (error.failures) {
            this.failures = error.failures;
          } else {
            this.failures = {};
          }
        }
      });
  }

}

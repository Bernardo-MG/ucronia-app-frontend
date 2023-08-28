import { Component } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';
import { PasswordResetRequest } from '../../models/password-reset-request';
import { PasswordResetService } from '../../services/password-reset.service';

@Component({
  selector: 'login-password-reset-request',
  templateUrl: './password-reset-request.component.html'
})
export class PasswordResetRequestComponent {

  public finished = false;

  /**
   * Loading flag. Shows the loading visual cue and disables the form. Its status depends on the login request.
   */
  public loading = false;

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private service: PasswordResetService
  ) { }

  public onPasswordReset(resetPassword: PasswordResetRequest) {
    this.loading = true;
    this.failures = {};
    this.service.requestResetPassword(resetPassword)
      .subscribe({
        next: response => {
          this.finished = true;
          this.loading = false;
        },
        error: error => {
          this.loading = false;
          if (error.failures) {
            this.failures = error.failures;
          } else {
            this.failures = {};
          }
        }
      });
  }

}

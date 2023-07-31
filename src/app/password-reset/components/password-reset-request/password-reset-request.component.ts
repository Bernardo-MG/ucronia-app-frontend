import { Component } from '@angular/core';
import { PasswordResetRequest } from '@app/password-reset/models/password-reset-request';
import { PasswordResetService } from '@app/password-reset/services/password-reset.service';

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

  constructor(
    private service: PasswordResetService
  ) { }

  public onPasswordReset(resetPassword: PasswordResetRequest) {
    this.loading = true;
    this.service.requestResetPassword(resetPassword).subscribe(r => {
      this.finished = true;
      this.loading = false;
    });
  }

}

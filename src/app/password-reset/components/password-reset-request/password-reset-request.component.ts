import { Component } from '@angular/core';
import { PasswordReset } from '@app/password-reset/models/password-reset';
import { PasswordResetRequest } from '@app/password-reset/models/password-reset-request';
import { PasswordResetService } from '@app/password-reset/services/password-reset.service';

@Component({
  selector: 'login-password-reset-request',
  templateUrl: './password-reset-request.component.html'
})
export class PasswordResetRequestComponent {

  public finished = false;

  constructor(
    private service: PasswordResetService
  ) { }

  public onPasswordReset(resetPassword: PasswordResetRequest) {
    this.service.requestResetPassword(resetPassword).subscribe(r => this.finished = true);
  }

}

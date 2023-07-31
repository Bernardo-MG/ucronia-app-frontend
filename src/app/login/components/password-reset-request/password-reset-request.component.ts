import { Component } from '@angular/core';
import { PasswordResetForm } from '@app/login/models/password-reset';
import { PasswordRestService } from '@app/login/services/password-reset.service';

@Component({
  selector: 'login-password-reset-request',
  templateUrl: './password-reset-request.component.html'
})
export class PasswordResetRequestComponent {

  public finished = false;

  constructor(
    private service: PasswordRestService
  ) { }

  public onPasswordReset(resetPassword: PasswordResetForm) {
    this.service.resetPassword(resetPassword).subscribe(r => this.finished = true);
  }

}

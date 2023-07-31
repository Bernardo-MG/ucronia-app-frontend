import { Component } from '@angular/core';
import { PasswordResetForm } from '@app/password-reset/models/password-reset';
import { PasswordRestService } from '@app/password-reset/services/password-reset.service';

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

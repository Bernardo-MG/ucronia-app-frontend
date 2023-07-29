import { Component } from '@angular/core';
import { PasswordResetForm } from '@app/login/models/password-reset';

@Component({
  selector: 'login-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass']
})
export class PasswordResetComponent {

  public onPasswordReset(login: PasswordResetForm) {
  }

}

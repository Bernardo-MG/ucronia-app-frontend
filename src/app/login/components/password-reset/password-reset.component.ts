import { Component } from '@angular/core';
import { PasswordResetForm } from '@app/login/models/password-reset';
import { LoginService } from '@app/login/services/login.service';

@Component({
  selector: 'login-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass']
})
export class PasswordResetComponent {

  public finished = false;

  constructor(
    private loginService: LoginService
  ) { }

  public onPasswordReset(resetPassword: PasswordResetForm) {
    this.loginService.resetPassword(resetPassword).subscribe(r => this.finished = true);
  }

}

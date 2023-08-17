import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { PasswordReset } from '../../models/password-reset';
import { PasswordResetService } from '../../services/password-reset.service';

@Component({
  selector: 'login-password-reset',
  templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent implements OnInit {

  public status = 'valid_token';

  private token = '';

  constructor(
    private route: ActivatedRoute,
    private service: PasswordResetService
  ) { }

  public ngOnInit(): void {
    // Validate token
    this.route.paramMap.subscribe(params => {
      this.load(params.get('token'));
    });
  }

  public onPasswordReset(confirm: ConfirmPassword): void {
    const reset = new PasswordReset();
    reset.password = confirm.password;
    this.service.resetPassword(this.token, reset).subscribe({
      next: d => {
        this.status = 'finished';
      }
    });
  }

  private load(token: string | null): void {
    if (token) {
      this.token = token;
      this.service.validateResetPasswordToken(token).subscribe(r => {
        if (!r.content.valid) {
          this.status = 'invalid_token';
        }
      });
    }
  }

}

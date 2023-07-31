import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordReset } from '@app/password-reset/models/password-reset';
import { PasswordResetService } from '@app/password-reset/services/password-reset.service';

@Component({
  selector: 'login-password-reset',
  templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent implements OnInit {

  private token = '';

  public valid = false;

  public changed = false;

  constructor(
    private route: ActivatedRoute,
    private service: PasswordResetService
  ) { }

  public ngOnInit(): void {
    // Validate token
    this.route.paramMap.subscribe(params => {
      if (params.has('token')) {
        this.load(params.get('token'));
      }
    });
  }

  public passwordReset(password: string): void {
    const reset = new PasswordReset();
    reset.token = this.token;
    reset.password = password;
    this.service.resetPassword(reset).subscribe(r => this.changed = true);
  }

  private load(token: string | null): void {
    if (token) {
      this.service.validateResetPasswordToken(token).subscribe(r => this.valid = r.content);
    }
  }

}

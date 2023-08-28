import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { Failure } from '@app/core/api/models/failure';
import { PasswordReset } from '../../models/password-reset';
import { PasswordResetService } from '../../services/password-reset.service';

@Component({
  selector: 'login-password-reset',
  templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent implements OnInit {

  public status = 'valid_token';

  private token = '';

  public failures: { [key: string]: Failure[] } = {};

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
      next: response => {
        this.status = 'finished';
      },
      error: response => {
        // TODO: Unwrap error response automatically
        if (response.error.failures) {
          this.failures = response.error.failures;
        } else {
          this.failures = {};
        }
      }
    });
  }

  private load(token: string | null): void {
    if (token) {
      this.token = token;
      this.service.validateResetPasswordToken(token).subscribe({
        next: response => {
          if (!response.content.valid) {
            this.status = 'invalid_token';
          }
        },
        error: response => {
          // TODO: Unwrap error response automatically
          if (response.error.failures) {
            this.failures = response.error.failures;
          } else {
            this.failures = {};
          }
        }
      });
    }
  }

}

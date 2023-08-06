import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordReset } from '@app/password-reset/models/password-reset';
import { PasswordResetService } from '@app/password-reset/services/password-reset.service';

@Component({
  selector: 'login-password-reset',
  templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent implements OnInit {

  public validToken = false;

  public changed = false;

  /**
   * Loading flag. Shows the loading visual cue and disables the form. Its status depends on the login request.
   */
  public loading = false;

  public finished = false;

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

  public onPasswordReset(password: string): void {
    const reset = new PasswordReset();
    reset.password = password;
    this.loading = true;
    this.finished = false;
    this.service.resetPassword(this.token, reset).subscribe(r => {
      this.changed = true;
      this.loading = false;
      this.finished = true;
    });
  }

  private load(token: string | null): void {
    if (token) {
      this.service.validateResetPasswordToken(token).subscribe(r => {
        this.token = token;
        this.validToken = r.content;
      });
    }
  }

}

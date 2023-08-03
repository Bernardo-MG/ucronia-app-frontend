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

  /**
   * Loading flag. Shows the loading visual cue and disables the form. Its status depends on the login request.
   */
  public loading = false;

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
    this.loading = true;
    this.service.resetPassword(reset).subscribe(r => {
      this.changed = true;
      this.loading = false;
    });
  }

  private load(token: string | null): void {
    if (token) {
      this.service.validateResetPasswordToken(token).subscribe(r => this.valid = r.content);
    }
  }

}

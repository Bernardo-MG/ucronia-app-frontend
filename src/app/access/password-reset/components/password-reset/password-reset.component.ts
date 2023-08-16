import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordReset } from '../../models/password-reset';
import { PasswordResetService } from '../../services/password-reset.service';

@Component({
  selector: 'login-password-reset',
  templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent implements OnInit {

  public validToken = false;

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
    this.finished = false;
    this.service.resetPassword(this.token, reset).subscribe({
      next: d => {
        this.finished = true;
      },
      error: error => {
      }
    });
  }

  private load(token: string | null): void {
    if (token) {
      this.token = token;
      this.service.validateResetPasswordToken(token).subscribe(r => {
        this.validToken = r.content;
      });
    }
  }

}

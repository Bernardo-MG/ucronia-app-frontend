import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordReset } from '@app/password-reset/models/password-reset';
import { PasswordResetService } from '@app/password-reset/services/password-reset.service';

@Component({
  selector: 'login-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass']
})
export class PasswordResetComponent implements OnInit {

  private token = '';

  constructor(
    private route: ActivatedRoute,
    private service: PasswordResetService
  ) { }

  public ngOnInit(): void {
    // Get token
    this.route.paramMap.subscribe(params => {
      if (params.has('token')) {
        this.load(params.get('token'));
      }
    });
  }

  private load(token: string | null): void {
    if (token) {
      this.service.validateResetPasswordToken(token).subscribe(r => this.token = token);
    }
  }
  

  private change(token: string | null): void {
    if (token) {
      const reset = new PasswordReset();
      reset.password = '';
      reset.password = '';
      this.service.resetPassword(reset).subscribe(r => this.token = token);
    }
  }

}

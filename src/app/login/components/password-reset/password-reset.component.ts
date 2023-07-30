import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@app/login/services/login.service';

@Component({
  selector: 'login-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass']
})
export class PasswordResetComponent implements OnInit {

  private token = '';

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
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
      this.loginService.validateResetPasswordToken(token).subscribe(r => this.token = token);
    }
  }

}

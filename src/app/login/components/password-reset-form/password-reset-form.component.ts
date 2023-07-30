import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@app/login/services/login.service';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.sass']
})
export class PasswordResetFormComponent {

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

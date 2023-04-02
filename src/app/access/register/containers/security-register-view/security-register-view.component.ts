import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityRegisterService } from '@app/access/register/security-register.service';
import { RegisterForm } from '@app/core/authentication/models/register-form';

@Component({
  selector: 'app-security-register-view',
  templateUrl: './security-register-view.component.html',
  styleUrls: ['./security-register-view.component.sass']
})
export class SecurityRegisterViewComponent {

  constructor(
    private service: SecurityRegisterService,
    private router: Router
  ) { }

  public onRegister(data: RegisterForm): void {
    this.service.register(data).subscribe(d => {
      this.router.navigate(['/']);
    });
  }

}

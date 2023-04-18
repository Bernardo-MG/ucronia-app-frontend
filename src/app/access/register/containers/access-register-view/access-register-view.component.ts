import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterForm } from '@app/core/authentication/models/register-form';
import { AccessRegisterService } from '../../services/access-register.service';

@Component({
  selector: 'access-register-view',
  templateUrl: './access-register-view.component.html',
  styleUrls: ['./access-register-view.component.sass']
})
export class AccessRegisterViewComponent {

  constructor(
    private service: AccessRegisterService,
    private router: Router
  ) { }

  public onRegister(data: RegisterForm): void {
    this.service.register(data).subscribe(d => {
      this.router.navigate(['/']);
    });
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordForm } from '../../model/change-password-form';
import { SecurityChangePasswordService } from '../../service/security-change-password.service';

@Component({
  selector: 'app-security-change-password-view',
  templateUrl: './security-change-password-view.component.html',
  styleUrls: ['./security-change-password-view.component.sass']
})
export class SecurityChangePasswordViewComponent  {

  constructor(
    private service: SecurityChangePasswordService,
    private router: Router
  ) { }

  public onChangePassword(data: ChangePasswordForm): void {
    this.service.changePassword(data).subscribe(d => {
      this.router.navigate(['/']);
    });
  }

}

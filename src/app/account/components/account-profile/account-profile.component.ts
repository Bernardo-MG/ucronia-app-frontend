import { Component } from '@angular/core';
import { SecurityStatus } from '@app/core/authentication/models/security-status';
import { AuthService } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'account-profile',
  templateUrl: './account-profile.component.html'
})
export class AccountProfileViewComponent {

  public account = new SecurityStatus();

  constructor(
    private authService: AuthService
  ) {
    this.authService.getStatus().subscribe(u => { this.account = u });
  }

}

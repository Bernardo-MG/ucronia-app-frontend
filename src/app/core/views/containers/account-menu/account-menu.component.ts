import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';
import { LoginService } from '@app/core/authentication/services/login.service';

@Component({
  selector: 'view-account-menu',
  templateUrl: './account-menu.component.html'
})
export class AccountMenuComponent {

  public username = '';

  private loginUrl = '/login';

  constructor(
    private securityContainer: SecurityContainer,
    private loginService: LoginService,
    private router: Router
  ) {
    this.securityContainer.getStatusObservable().subscribe(u => { this.username = u.username });
  }

  public onLogout() {
    this.loginService.logout();
    this.router.navigate([this.loginUrl]);
  }

}

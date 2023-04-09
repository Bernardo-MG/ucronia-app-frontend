import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';
import { LoginService } from '@app/core/authentication/services/login.service';

@Component({
  selector: 'view-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.sass']
})
export class AccountMenuComponent {

  public username = '';

  private loginUrl = '/login';

  constructor(
    private authenticationContainer: AuthenticationContainer,
    private loginService: LoginService,
    private router: Router
  ) {
    this.authenticationContainer.getUserStatusObservable().subscribe(u => { this.username = u.username });
  }

  public onLogout() {
    this.loginService.logout();
    this.router.navigate([this.loginUrl]);
  }

}

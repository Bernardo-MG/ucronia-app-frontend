import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'menu-account-menu',
  templateUrl: './account-menu.component.html'
})
export class AccountMenuComponent {

  public username = '';

  private loginUrl = '/login';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getStatus().subscribe(u => { this.username = u.username });
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate([this.loginUrl]);
  }

}

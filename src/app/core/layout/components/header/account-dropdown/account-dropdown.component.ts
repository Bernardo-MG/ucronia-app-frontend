import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { IconAccountComponent, IconLogoutComponent, IconSettingsComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective } from '@bernardo-mg/layout';

@Component({
    selector: 'layout-account-dropdown',
    imports: [RouterModule, IconAccountComponent, IconSettingsComponent, IconLogoutComponent, JustifyCenterDirective],
    templateUrl: './account-dropdown.component.html'
})
export class AccountDropdownComponent implements OnInit {

  public username = '';

  constructor(
    private authContainer: AuthContainer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authContainer.getDetails().subscribe(u => { this.username = u.username });
  }

  public onLogout() {
    this.authContainer.logout();
    if (this.router.url === '/') {
      window.location.reload();
    } else {
      this.router.navigate(['/']);
    }
  }

}

import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAccountComponent, IconLogoutComponent, IconSettingsComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective } from '@bernardo-mg/layout';

@Component({
  selector: 'layout-account-dropdown',
  imports: [RouterModule, IconAccountComponent, IconSettingsComponent, IconLogoutComponent, JustifyCenterDirective],
  templateUrl: './account-dropdown.container.html'
})
export class AccountDropdownContainer {

  private readonly router = inject(Router);

  private readonly authContainer = inject(AuthContainer);

  public username = '';

  constructor() {
    this.authContainer.securityDetails.subscribe(u => { this.username = u.username });
  }

  public onLogout() {
    this.authContainer.logout();
    // TODO: maybe this should be done by a service
    if (this.router.url === '/') {
      window.location.reload();
    } else {
      this.router.navigate(['/']);
    }
  }

}

import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'layout-account-dropdown',
  imports: [RouterModule, ButtonModule, MenuModule],
  templateUrl: './account-dropdown.container.html'
})
export class AccountDropdownContainer {

  private readonly router = inject(Router);

  private readonly authContainer = inject(AuthContainer);

  public username = '';

  public readonly accountItems: MenuItem[] = [];

  constructor() {
    this.authContainer.securityDetails
      .subscribe(u => this.username = u.username);

    this.accountItems.push(
      {
        label: this.username,
        items: [
          {
            label: 'Cuenta',
            icon: 'pi pi-cog',
            routerLink: '/account'
          },
          {
            separator: true
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.onLogout()
          }
        ]
      });
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

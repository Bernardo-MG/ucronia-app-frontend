import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'layout-account-dropdown',
  imports: [RouterModule, ButtonModule, MenuModule],
  templateUrl: './account-dropdown.html'
})
export class AccountDropdown {

  private readonly authContainer = inject(AuthContainer);

  public readonly accountItems: MenuItem[] = [];

  public username = '';

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
            command: () => this.authContainer.logout()
          }
        ]
      });
  }

}

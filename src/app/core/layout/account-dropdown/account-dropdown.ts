import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'layout-account-dropdown',
  imports: [RouterModule, ButtonModule, MenuModule],
  templateUrl: './account-dropdown.html'
})
export class AccountDropdown {

  private readonly authService = inject(AuthService);

  public readonly accountItems: MenuItem[] = [];

  public name = '';

  constructor() {
    this.authService.securityDetails
      .subscribe(u => this.name = u.username);

    this.accountItems.push(
      {
        label: this.name,
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
            command: () => this.authService.logout()
          }
        ]
      });
  }

}

import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'layout-security-layout',
  imports: [RouterModule, MenuModule],
  templateUrl: './security-layout.html'
})
export class SecurityLayout {

  public readonly menus: MenuItem[];

  constructor() {
    const authContainer = inject(AuthContainer);
    const items = [];
    if (authContainer.hasPermission('user', 'view')) {
      items.push(
        {
          label: 'Usuarios',
          routerLink: '/security/users',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('role', 'view')) {
      items.push(
        {
          label: 'Roles',
          routerLink: '/security/roles',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('user_token', 'view')) {
      items.push(
        {
          label: 'Tokens de usuario',
          routerLink: '/security/user-tokens',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('user', 'view')) {
      items.push(
        {
          label: 'Auditoría',
          routerLink: '/security/audit',
          icon: 'pi pi-users'
        });
    }
    this.menus =
      [
        {
          label: 'Seguridad',
          items: items
        }
      ]
  }

}

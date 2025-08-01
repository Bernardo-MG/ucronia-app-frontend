import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'layout-security-layout',
  imports: [RouterModule, SidebarLayoutComponent],
  templateUrl: './security-layout.container.html'
})
export class SecurityLayoutContainer {

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

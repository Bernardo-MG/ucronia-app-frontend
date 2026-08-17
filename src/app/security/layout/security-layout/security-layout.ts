import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
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
    const authService = inject(AuthService);
    const items = [];
    if (authService.hasPermission('USER', 'VIEW')) {
      items.push(
        {
          label: 'Usuarios',
          routerLink: '/security/users',
          icon: 'pi pi-users'
        });
    }
    if (authService.hasPermission('ROLE', 'VIEW')) {
      items.push(
        {
          label: 'Roles',
          routerLink: '/security/roles',
          icon: 'pi pi-users'
        });
    }
    if (authService.hasPermission('USER_TOKEN', 'VIEW')) {
      items.push(
        {
          label: 'Tokens de usuario',
          routerLink: '/security/user-tokens',
          icon: 'pi pi-users'
        });
    }
    if (authService.hasPermission('USER', 'VIEW')) {
      items.push(
        {
          label: 'Auditoría',
          routerLink: '/security/audit',
          icon: 'pi pi-users'
        });
    }
    this.menus = items;

  }

}

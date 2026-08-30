import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { SecurityPermissions } from '@bernardo-mg/security';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'layout-security-layout',
  imports: [RouterModule, CardModule, RippleModule],
  templateUrl: './security-layout.html',
  styleUrl: './security-layout.sass'
})
export class SecurityLayout {

  public readonly menus: MenuItem[];

  constructor() {
    const authService = inject(AuthService);
    const items = [];

    if (authService.hasPermission(SecurityPermissions.user.read)) {
      items.push({
        label: 'Usuarios',
        routerLink: '/security/users',
        icon: 'pi pi-users'
      });
    }

    if (authService.hasPermission(SecurityPermissions.role.read)) {
      items.push({
        label: 'Roles',
        routerLink: '/security/roles',
        icon: 'pi pi-id-card'
      });
    }

    if (authService.hasPermission(SecurityPermissions.userToken.read)) {
      items.push({
        label: 'Tokens de usuario',
        routerLink: '/security/user-tokens',
        icon: 'pi pi-key'
      });
    }

    if (authService.hasPermission(SecurityPermissions.user.read)) {
      items.push({
        label: 'Auditoría',
        routerLink: '/security/audit',
        icon: 'pi pi-history'
      });
    }

    this.menus = items;
  }

}
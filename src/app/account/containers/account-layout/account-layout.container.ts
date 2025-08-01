import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'account-layout',
    imports: [RouterModule, SidebarLayoutComponent],
    templateUrl: './account-layout.container.html'
})
export class AccountLayoutContainer {

  public readonly menus: MenuItem[];

  constructor(authContainer: AuthContainer) {
    const items = [];
    if (authContainer.hasPermission('member', 'view')) {
      items.push(
        {
          label: 'Perfil',
          routerLink: '/account/profile',
          icon: 'pi pi-user'
        });
    }
    if (authContainer.hasPermission('member', 'view')) {
      items.push(
        {
          label: 'Contraseña',
          routerLink: '/account/password',
          icon: 'pi pi-user'
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

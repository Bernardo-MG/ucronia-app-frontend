import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'layout-association-admin-fees-layout',
  imports: [RouterModule, SidebarLayoutComponent],
  templateUrl: './association-admin-fees-layout.container.html'
})
export class AssociationAdminFeesLayoutContainer {

  public readonly menus: MenuItem[];

  constructor() {
    const authContainer = inject(AuthContainer);
    const items = [];
    if (authContainer.hasPermission('fee', 'view')) {
      items.push(
        {
          label: 'Cuotas',
          routerLink: '/association/admin/money/fees',
          icon: 'pi pi-money-bill'
        });
    }
    if (authContainer.hasPermission('funds', 'view')) {
      items.push(
        {
          label: 'Fondos',
          routerLink: '/association/admin/money/funds',
          icon: 'pi pi-money-bill'
        });
    }
    this.menus =
      [
        {
          label: 'Administración',
          items: items
        }
      ]
  }

}

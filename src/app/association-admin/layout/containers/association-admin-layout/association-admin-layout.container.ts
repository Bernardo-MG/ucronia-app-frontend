import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'layout-association-admin-layout',
  imports: [RouterModule, SidebarLayoutComponent],
  templateUrl: './association-admin-layout.container.html'
})
export class AssociationAdminLayoutContainer {

  public readonly menus: MenuItem[];

  constructor(authContainer: AuthContainer) {
    const items = [];
    if (authContainer.hasPermission('activity_calendar', 'person')) {
      items.push(
        {
          label: 'Gente',
          routerLink: '/association/admin/people',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('member', 'fee')) {
      items.push(
        {
          label: 'Cuotas',
          routerLink: '/association/admin/fees',
          icon: 'pi pi-money-bill'
        });
    }
    if (authContainer.hasPermission('my_fees', 'funds')) {
      items.push(
        {
          label: 'Fondos',
          routerLink: '/association/admin/funds',
          icon: 'pi pi-money-bill'
        });
    }
    if (authContainer.hasPermission('library', 'view')) {
      items.push(
        {
          label: 'Biblioteca',
          routerLink: '/association/admin/library',
          icon: 'pi pi-book'
        });
    }
    this.menus =
      [
        {
          label: 'Asociación',
          items: items
        }
      ]
  }

}

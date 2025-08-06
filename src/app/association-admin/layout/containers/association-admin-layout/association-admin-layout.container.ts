import { Component, inject } from '@angular/core';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'layout-association-admin-layout',
  imports: [SidebarLayoutComponent],
  templateUrl: './association-admin-layout.container.html'
})
export class AssociationAdminLayoutContainer {

  public readonly menus: MenuItem[];

  constructor() {
    const authContainer = inject(AuthContainer);
    const items = [];
    if (authContainer.hasPermission('person', 'view')) {
      items.push(
        {
          label: 'Gente',
          routerLink: '/association/admin/people',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('fee', 'view')) {
      items.push(
        {
          label: 'Cuotas',
          routerLink: '/association/admin/fees',
          icon: 'pi pi-money-bill'
        });
    }
    if (authContainer.hasPermission('funds', 'view')) {
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

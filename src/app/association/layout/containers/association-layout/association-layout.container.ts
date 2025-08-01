import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'layout-association-layout',
  imports: [RouterModule, SidebarLayoutComponent],
  templateUrl: './association-layout.container.html'
})
export class AssociationLayoutContainer {

  public readonly menus: MenuItem[];

  constructor() {
    const authContainer = inject(AuthContainer);
    const items = [];
    if (authContainer.hasPermission('activity_calendar', 'view')) {
      items.push(
        {
          label: 'Calendario',
          routerLink: '/association/calendar',
          icon: 'pi pi-calendar'
        });
    }
    if (authContainer.hasPermission('member', 'view')) {
      items.push(
        {
          label: 'Socios',
          routerLink: '/association/members',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('my_fees', 'view')) {
      items.push(
        {
          label: 'Mis cuotas',
          routerLink: '/association/myFees',
          icon: 'pi pi-money-bill'
        });
    }
    if (authContainer.hasPermission('library', 'view')) {
      items.push(
        {
          label: 'Biblioteca',
          routerLink: '/association/library',
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

import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem, MessageService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-association-layout',
  imports: [RouterModule, ToastModule, DrawerModule, MenuModule, Navbar],
  templateUrl: './association-layout.html',
  providers: [MessageService]
})
export class AssociationLayout {

  public menus: MenuItem[] = [];

  public menuActive = false;

  constructor() {
    const authContainer = inject(AuthContainer);
    authContainer.securityDetails
      .subscribe(details => {
        const items = this.getAssociationItems(authContainer);
        const adminItems = this.getAdminItems(authContainer);
        this.menus = [];
        if (items.length) {
          this.menus.push(
            {
              label: 'Asociación',
              items: items
            }
          );
        }
        if (adminItems.length) {
          this.menus.push(
            {
              label: 'Administración',
              items: adminItems
            }
          );
        }
      });
  }

  public onToggleMenu(status: boolean) {
    this.menuActive = status;
  }

  private getAssociationItems(authContainer: AuthContainer) {
    const items = [];
    if (authContainer.hasPermission('activity_calendar', 'view')) {
      items.push(
        {
          label: 'Actividades',
          routerLink: '/association/activity',
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
    return items;
  }

  private getAdminItems(authContainer: AuthContainer) {
    const items = [];
    if (authContainer.hasPermission('person', 'view')) {
      items.push(
        {
          label: 'Gente',
          routerLink: '/association/admin/people',
          icon: 'pi pi-users'
        });
    }
    if (authContainer.hasPermission('member', 'view')) {
      items.push(
        {
          label: 'Cuotas',
          routerLink: '/association/admin/fees',
          icon: 'pi pi-money-bill'
        });
    }
    if (authContainer.hasPermission('my_fees', 'view')) {
      items.push(
        {
          label: 'Fondos',
          routerLink: '/association/admin/funds',
          icon: 'pi pi-money-bill'
        });
    }
    if (authContainer.hasPermission('library_book', 'view')) {
      items.push(
        {
          label: 'Libros',
          routerLink: '/association/admin/library/books',
          icon: 'pi pi-book'
        });
    }
    return items;
  }

}

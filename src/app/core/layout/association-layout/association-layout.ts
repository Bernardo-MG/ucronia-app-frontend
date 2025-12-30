import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-association-layout',
  imports: [RouterModule, ToastModule, DrawerModule, MenuModule, ConfirmPopupModule, Navbar],
  templateUrl: './association-layout.html',
  providers: [ConfirmationService]
})
export class AssociationLayout {

  public menus: MenuItem[] = [];

  public menuActive = false;

  constructor() {
    const authService = inject(AuthService);
    authService.securityDetails
      .subscribe(details => {
        const items = this.getAssociationItems(authService);
        const adminItems = this.getAdminItems(authService);
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
        // Add close command to every item
        this.menus.forEach(group =>
          group.items?.forEach(item =>
            item.command = () => this.menuActive = false
          )
        );
      });
  }

  public onToggleMenu(status: boolean) {
    this.menuActive = status;
  }

  private getAssociationItems(authService: AuthService): MenuItem[] {
    const items = [];
    if (authService.hasPermission('member', 'view')) {
      items.push(
        {
          label: 'Socios',
          routerLink: '/association/members',
          icon: 'pi pi-users'
        });
    }
    if (authService.hasPermission('my_fees', 'view')) {
      items.push(
        {
          label: 'Mis cuotas',
          routerLink: '/association/myFees',
          icon: 'pi pi-money-bill'
        });
    }
    if (authService.hasPermission('library', 'view')) {
      items.push(
        {
          label: 'Biblioteca',
          routerLink: '/association/library',
          icon: 'pi pi-book'
        });
    }
    return items;
  }

  private getAdminItems(authService: AuthService): MenuItem[] {
    const items = [];
    if (authService.hasPermission('profile', 'view')) {
      items.push(
        {
          label: 'Contactos',
          routerLink: '/association/contacts',
          icon: 'pi pi-users'
        });
    }
    if (authService.hasPermission('member', 'view')) {
      items.push(
        {
          label: 'Cuotas',
          routerLink: '/association/fees',
          icon: 'pi pi-money-bill'
        });
    }
    if (authService.hasPermission('my_fees', 'view')) {
      items.push(
        {
          label: 'Fondos',
          routerLink: '/association/funds',
          icon: 'pi pi-money-bill'
        });
    }

    return items;
  }

}

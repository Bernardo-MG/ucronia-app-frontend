import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
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
    if (authService.hasPermission(UcroniaPermissions.directory.member.read)) {
      items.push(
        {
          label: 'Socios',
          routerLink: '/association/members',
          icon: 'pi pi-users'
        });
    }
    if (authService.hasPermission(UcroniaPermissions.myFees.read)) {
      items.push(
        {
          label: 'Mis cuotas',
          routerLink: '/association/myFees',
          icon: 'pi pi-money-bill'
        });
    }
    if (authService.hasPermission(UcroniaPermissions.library.book.read)) {
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
    if (authService.hasPermission(UcroniaPermissions.directory.profile.read)) {
      items.push(
        {
          label: 'Directorio',
          routerLink: '/association/directory',
          icon: 'pi pi-users'
        });
    }
    if (authService.hasPermission(UcroniaPermissions.fee.read)) {
      items.push(
        {
          label: 'Cuotas',
          routerLink: '/association/fees',
          icon: 'pi pi-money-bill'
        });
    }
    if (authService.hasPermission(UcroniaPermissions.transaction.read)) {
      items.push(
        {
          label: 'Fondos',
          routerLink: '/association/funds',
          icon: 'pi pi-money-bill'
        });
    }
    if (authService.hasPermission(UcroniaPermissions.activity.read)) {
      items.push(
        {
          label: 'Actividad',
          routerLink: '/association/activities',
          icon: 'pi pi-calendar'
        });
    }
    if (authService.hasPermission(UcroniaPermissions.scheduledGame.read)) {
      items.push(
        {
          label: 'Partidas programadas',
          routerLink: '/association/scheduled-games',
          icon: 'pi pi-clock'
        });
    }

    return items;
  }

}

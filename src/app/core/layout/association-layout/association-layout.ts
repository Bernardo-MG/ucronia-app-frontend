import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { librarySettingsPermissions } from '@app/association/library/settings/library-settings-permissions';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-association-layout',
  imports: [RouterModule, ToastModule, DrawerModule, RippleModule, ConfirmPopupModule, Navbar],
  templateUrl: './association-layout.html',
  styleUrl: './association-layout.scss',
  providers: [ConfirmationService]
})
export class AssociationLayout {

  public menuActive = false;
  public menus: MenuItem[] = [];

  public constructor() {
    const authService = inject(AuthService);
    authService.securityDetails
      .pipe(takeUntilDestroyed())
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
      });
  }

  // Event handlers
  public closeMenu(): void {
    this.menuActive = false;
  }

  public onToggleMenu(status: boolean): void {
    this.menuActive = status;
  }

  // Private methods
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
    if (authService.hasPermission(UcroniaPermissions.image.read)) {
      items.push(
        {
          label: 'Imágenes',
          routerLink: '/association/images',
          icon: 'pi pi-images'
        });
    }
    if (authService.hasPermission(UcroniaPermissions.file.read)) {
      items.push(
        {
          label: 'Archivos',
          routerLink: '/association/files',
          icon: 'pi pi-file'
        });
    }

    return items;
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
    const canReadBooks = authService.hasPermission(UcroniaPermissions.library.book.read);
    if (canReadBooks || authService.hasAnyPermission(librarySettingsPermissions)) {
      items.push(
        {
          label: 'Biblioteca',
          routerLink: canReadBooks ? '/association/library' : '/association/library/settings',
          icon: 'pi pi-book'
        });
    }
    return items;
  }

}


import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { LayoutService } from '../../services/layout.service';
import { AccountDropdownContainer } from '../account-dropdown/account-dropdown.container';

@Component({
  selector: 'layout-navbar',
  imports: [RouterModule, MenubarModule, ButtonModule, MenuModule, AccountDropdownContainer],
  templateUrl: './navbar.container.html'
})
export class NavbarContainer {

  private readonly authContainer = inject(AuthContainer);

  public title = '';

  public showSettings = false;

  public showSecurity = false;

  public showAssociation = false;

  public get loggedIn() {
    return this.authContainer.logged;
  }

  public get loggedOut() {
    return !this.loggedIn;
  }

  public readonly menuItems: MenuItem[] = [];

  constructor() {
    const authContainer = inject(AuthContainer);
    const layoutService = inject(LayoutService);

    // App title
    this.title = layoutService.getTitle();

    // Show sections flags
    this.showSettings = layoutService.showSettingsLink();
    this.showSecurity = layoutService.showSecurityLink();
    this.showAssociation = layoutService.showAssociationLink();

    // Links
    if (this.showAssociation) {
      this.menuItems.push({
        label: 'Asociación',
        icon: 'pi pi-users',
        routerLink: '/association'
      });
    }
    const adminLinks: MenuItem[] = [];
    if (authContainer.hasPermission('person', 'view')) {
      adminLinks.push({
        label: 'Gente',
        routerLink: '/association/admin/people'
      });
    }
    if (authContainer.hasPermission('funds', 'view')) {
      adminLinks.push({
        label: 'Fondos',
        routerLink: '/association/admin/money'
      });
    }
    if (authContainer.hasPermission('library', 'view')) {
      adminLinks.push({
        label: 'Biblioteca',
        routerLink: '/association/admin/library'
      });
    }
    if (adminLinks.length > 0) {
      this.menuItems.push({
        label: 'Administración',
        icon: 'pi pi-cog',
        items: adminLinks
      });
    }
  }

}

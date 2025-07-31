
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
import { MenuLink } from '@bernardo-mg/ui';
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

  public get showAdmin() {
    return this.adminLinks.length > 0;
  }

  public readonly adminLinks: MenuLink[];

  public readonly menuItems: MenuItem[] = [];

  constructor() {
    const layoutService = inject(LayoutService);

    // App title
    this.title = layoutService.getTitle();

    // Show sections flags
    this.showSettings = layoutService.showSettingsLink();
    this.showSecurity = layoutService.showSecurityLink();
    this.showAssociation = layoutService.showAssociationLink();

    // Links
    this.adminLinks = layoutService.getLinks();

    this.loadMenu();
  }

  private loadMenu() {
    if (!this.loggedIn) return;

    if (this.showAssociation) {
      this.menuItems.push({
        label: 'Asociación',
        icon: 'pi pi-users',
        routerLink: '/association'
      });
    }

    if (this.showAdmin) {
      this.menuItems.push({
        label: 'Administración',
        icon: 'pi pi-cog',
        items: this.adminLinks.map(link => ({
          label: link.title,
          routerLink: link.path
        }))
      });
    }
  }

}

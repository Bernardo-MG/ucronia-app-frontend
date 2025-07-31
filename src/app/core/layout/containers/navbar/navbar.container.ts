
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconLoginComponent, IconSettingsComponent, IconShieldComponent } from '@bernardo-mg/icons';
import { MenuLink } from '@bernardo-mg/ui';
import { AccountDropdownContainer } from '../account-dropdown/account-dropdown.container';
import { LayoutService } from '../../services/layout.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'layout-navbar',
  imports: [RouterModule, MenubarModule, ButtonModule, IconLoginComponent, IconShieldComponent, IconSettingsComponent, AccountDropdownContainer],
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

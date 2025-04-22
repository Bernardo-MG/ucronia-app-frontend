import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconLoginComponent, IconSettingsComponent, IconShieldComponent } from '@bernardo-mg/icons';
import { MenuLink } from '@bernardo-mg/ui';
import { AccountDropdownContainer } from '../account-dropdown/account-dropdown.container';
import { AssociationAdminLayoutService } from '../../services/association-admin-layout.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'layout-navbar',
  imports: [CommonModule, RouterModule, IconLoginComponent, IconShieldComponent, IconSettingsComponent, AccountDropdownContainer],
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

  constructor(
    layoutService: LayoutService,
    associationAdminLayoutService: AssociationAdminLayoutService
  ) {
    // App title
    this.title = layoutService.getTitle();

    // Show sections flags
    this.showSettings = layoutService.showSettingsLink();
    this.showSecurity = layoutService.showSecurityLink();
    this.showAssociation = layoutService.showAssociationLink();

    // Links
    this.adminLinks = associationAdminLayoutService.getLinks();
  }

}

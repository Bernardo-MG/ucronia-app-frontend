import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconLoginComponent, IconSettingsComponent, IconShieldComponent } from '@bernardo-mg/icons';
import { MenuLink } from '@bernardo-mg/layout';
import { AssociationAdminLayoutService } from '../../services/association-admin-layout.service';
import { AccountDropdownComponent } from '../account-dropdown/account-dropdown.component';

@Component({
  selector: 'layout-navbar',
  imports: [CommonModule, RouterModule, IconLoginComponent, IconShieldComponent, IconSettingsComponent, AccountDropdownComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public loggedIn = false;

  @Input() public showSettings = false;

  @Input() public showSecurity = false;

  @Input() public showAssociation = false;

  public get showAdmin() {
    return this.adminLinks.length > 0;
  }

  public readonly adminLinks: MenuLink[];

  constructor(
    associationAdminLayoutService: AssociationAdminLayoutService
  ) {
    this.adminLinks = associationAdminLayoutService.getLinks();
  }

  public get loggedOut() {
    return !this.loggedIn;
  }

}

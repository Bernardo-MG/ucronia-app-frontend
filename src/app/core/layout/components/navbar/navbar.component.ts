import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconLoginComponent, IconSettingsComponent, IconShieldComponent } from '@bernardo-mg/icons';
import { Menu, MenuLink } from '@bernardo-mg/layout';
import { AssociationAdminLayoutService } from '../../services/association-admin-layout.service';
import { AccountDropdownComponent } from '../account-dropdown/account-dropdown.component';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'layout-navbar',
  imports: [CommonModule, RouterModule, IconLoginComponent, IconShieldComponent, IconSettingsComponent, AccountDropdownComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  @Input() public title = '';

  @Input() public loggedIn = false;

  @Input() public showSettings = false;

  @Input() public showSecurity = false;

  @Input() public showAssociation = false;

  public showAdmin = false;

  public adminLinks: MenuLink[] = [];

  constructor(
    private layoutService: LayoutService,
    private associationAdminLayoutService: AssociationAdminLayoutService
  ) { }

  public get loggedOut() {
    return !this.loggedIn;
  }

  ngOnInit(): void {
    // Load menus
    this.showAdmin = this.layoutService.showAssociationAdminLink();
    if(this.showAdmin) {
      this.adminLinks = this.associationAdminLayoutService.getLinks();
    } else {
      this.adminLinks = [];
    }
  }

}

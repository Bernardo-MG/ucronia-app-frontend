import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconSettingsComponent, IconShieldComponent, LoginIconComponent } from 'icons';
import { AccountDropdownComponent } from '../account-dropdown/account-dropdown.component';

@Component({
    selector: 'layout-navbar',
    imports: [CommonModule, RouterModule, LoginIconComponent, IconShieldComponent, IconSettingsComponent, AccountDropdownComponent],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public loggedIn = false;

  @Input() public showSettings = false;

  @Input() public showSecurity = false;

  @Input() public showAssociation = false;

  @Input() public showAdmin = false;

  public get loggedOut() {
    return !this.loggedIn;
  }

}

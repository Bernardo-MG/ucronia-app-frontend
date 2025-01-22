import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginIconComponent } from '@app/shared/icons/components/icon-login/icon-login.component';
import { IconSettingsComponent } from '@app/shared/icons/components/icon-settings/icon-settings.component';
import { IconShieldComponent } from '@app/shared/icons/components/icon-shield/icon-shield.component';
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

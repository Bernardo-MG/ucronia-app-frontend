import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountDropdownComponent } from '@app/core/layout/components/header/account-dropdown/account-dropdown.component';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'layout-public-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, AccountDropdownComponent],
  templateUrl: './public-navbar.component.html'
})
export class PublicNavbarComponent {

  @Input() public title = '';

  @Input() public loggedIn = false;

  @Input() public showConfig = false;

  @Input() public showSecurity = false;

  public get loggedOut() {
    return !this.loggedIn;
  }

}

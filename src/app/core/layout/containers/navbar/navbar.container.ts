
import { Component, inject, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@bernardo-mg/authentication';
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

  public readonly toggleMenu = output<boolean>();

  private readonly authContainer = inject(AuthContainer);

  public title = '';

  public showSettings = false;

  public showSecurity = false;

  public get loggedOut() {
    return !this.authContainer.logged;
  }

  constructor() {
    const layoutService = inject(LayoutService);

    // App title
    this.title = layoutService.getTitle();

    // Show sections flags
    this.showSettings = layoutService.showSettingsLink();
    this.showSecurity = layoutService.showSecurityLink();
  }

}

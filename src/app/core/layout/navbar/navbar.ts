
import { Component, inject, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AccountDropdown } from '../account-dropdown/account-dropdown';
import { LayoutService } from '../layout-service';

@Component({
  selector: 'layout-navbar',
  imports: [RouterModule, MenubarModule, ButtonModule, MenuModule, AccountDropdown],
  templateUrl: './navbar.html'
})
export class Navbar {

  public readonly toggleMenu = output<boolean>();

  private readonly authService = inject(AuthService);

  public readonly title;

  public readonly showSettings;

  public readonly showSecurity;

  public get loggedIn() {
    return this.authService.logged;
  }

  public get loggedOut() {
    return !this.authService.logged;
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

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderNavigationWrapperComponent } from '@app/core/layout/components/header-navigation-wrapper/header-navigation-wrapper.component';
import { SideMenuComponent } from '@app/core/layout/components/side-menu/side-menu.component';
import { Menu } from '@app/shared/menu/models/menu';
import { MenuLink } from '@app/shared/menu/models/menu-link';

@Component({
  selector: 'account-layout',
  standalone: true,
  imports: [RouterModule, HeaderNavigationWrapperComponent, SideMenuComponent],
  templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent {

  public menus: Menu[] = [new Menu([new MenuLink('Profile', '/account/profile'), new MenuLink('Password', '/account/password')], "Setting")];

}

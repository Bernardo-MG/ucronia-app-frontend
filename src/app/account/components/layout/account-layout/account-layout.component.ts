import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { Menu } from '@app/shared/menu/models/menu';
import { MenuLink } from '@app/shared/menu/models/menu-link';

@Component({
  selector: 'account-layout',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent],
  templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent {

  public title = '';

  public showConfigMenu = false;

  public menus: Menu[] = [new Menu([new MenuLink('Profile', '/account/profile'), new MenuLink('Password', '/account/password')], "Setting")];

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();

    // Show config link
    this.showConfigMenu = this.layoutService.showConfigurationLink();
  }

}

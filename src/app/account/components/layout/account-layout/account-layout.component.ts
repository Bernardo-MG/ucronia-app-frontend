import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountLayoutService } from '@app/account/services/account-layout.service';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SidebarLayoutComponent } from '@app/core/layout/components/layout/sidebar-layout/sidebar-layout.component';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'account-layout',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent, SidebarLayoutComponent],
  templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent {

  public title = '';

  public showConfigMenu = false;

  public menus: Menu[] = [];

  constructor(
    private layoutService: LayoutService,
    private accountLayoutService: AccountLayoutService
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();

    // Show config link
    this.showConfigMenu = this.layoutService.showConfigurationLink();

    // Load menu
    this.menus = this.accountLayoutService.getMenus();
  }

}

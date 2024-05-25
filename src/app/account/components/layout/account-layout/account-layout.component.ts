import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountLayoutService } from '@app/account/services/account-layout.service';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'account-layout',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent, SidebarLayoutComponent],
  templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private accountLayoutService: AccountLayoutService
  ) { }

  ngOnInit(): void {
    // Load menu
    this.menus = this.accountLayoutService.getMenus();
  }

}

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountLayoutService } from '@app/account/services/account-layout.service';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { Menu } from '@bernardo-mg/layout';

@Component({
    selector: 'account-layout',
    imports: [RouterModule, SidebarLayoutContainer],
    templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private accountLayoutService: AccountLayoutService
  ) { }

  public ngOnInit(): void {
    // Load menu
    this.menus = this.accountLayoutService.getMenus();
  }

}

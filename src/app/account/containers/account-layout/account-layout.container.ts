import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountLayoutService } from '@app/account/services/account-layout.service';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { Menu } from '@bernardo-mg/layout';

@Component({
    selector: 'account-layout',
    imports: [RouterModule, SidebarLayoutContainer],
    templateUrl: './account-layout.container.html'
})
export class AccountLayoutContainer {

  public menus: Menu[] = [];

  constructor(
    service: AccountLayoutService
  ) {
    // Load menu
    this.menus = service.getMenus();
  }

}

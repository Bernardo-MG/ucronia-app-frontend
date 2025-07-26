import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountLayoutService } from '@app/account/services/account-layout.service';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@bernardo-mg/ui';

@Component({
    selector: 'account-layout',
    imports: [RouterModule, SidebarLayoutComponent],
    templateUrl: './account-layout.container.html'
})
export class AccountLayoutContainer {

  public menus: Menu[] = [];

  constructor() {
    const service = inject(AccountLayoutService);

    // Load menu
    this.menus = service.getMenus();
  }

}

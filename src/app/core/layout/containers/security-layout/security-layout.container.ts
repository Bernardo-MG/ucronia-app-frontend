import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { SecurityLayoutService } from '@app/core/layout/services/security-layout.service';
import { Menu } from '@bernardo-mg/layout';

@Component({
  selector: 'layout-security-layout',
  imports: [RouterModule, SidebarLayoutContainer],
  templateUrl: './security-layout.container.html'
})
export class SecurityLayoutContainer {

  public readonly menus: Menu[] = [];

  constructor(
    securityLayoutService: SecurityLayoutService
  ) {
    this.menus = securityLayoutService.getMenus();
  }

}

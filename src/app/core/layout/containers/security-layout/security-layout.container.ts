import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { SecurityLayoutService } from '@app/core/layout/services/security-layout.service';
import { Menu } from '@bernardo-mg/layout';

@Component({
  selector: 'layout-security-layout',
  imports: [RouterModule, SidebarLayoutComponent],
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

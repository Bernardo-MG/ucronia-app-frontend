import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@bernardo-mg/ui';
import { SecurityLayoutService } from '../../services/security-layout.service';

@Component({
  selector: 'layout-security-layout',
  imports: [RouterModule, SidebarLayoutComponent],
  templateUrl: './security-layout.container.html'
})
export class SecurityLayoutContainer {

  public readonly menus: Menu[] = [];

  constructor(
    service: SecurityLayoutService
  ) {
    this.menus = service.getMenus();
  }

}

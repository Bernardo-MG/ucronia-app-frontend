import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { SecurityLayoutService } from '@app/core/layout/services/security-layout.service';
import { Menu } from '@bernardo-mg/layout';

@Component({
  selector: 'layout-security-layout',
  imports: [RouterModule, SidebarLayoutContainer],
  templateUrl: './security-layout.container.html'
})
export class SecurityLayoutContainer implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private securityLayoutService: SecurityLayoutService
  ) { }

  public ngOnInit(): void {
    // Load menus
    this.menus = this.securityLayoutService.getMenus();
  }

}

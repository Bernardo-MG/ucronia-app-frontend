import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { Menu } from '@bernardo-mg/layout';
import { SecurityLayoutService } from '../../services/security-layout.service';

@Component({
    selector: 'access-sidebar',
    imports: [RouterModule, SidebarLayoutContainer],
    templateUrl: './security-layout.container.html'
})
export class SecurityLayoutContainer implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private securityLayoutService: SecurityLayoutService
  ) { }

  ngOnInit(): void {
    // Load menus
    this.menus = this.securityLayoutService.getMenus();
  }

}

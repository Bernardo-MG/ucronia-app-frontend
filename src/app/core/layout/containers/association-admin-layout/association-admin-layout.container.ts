import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { AssociationAdminLayoutService } from '@app/core/layout/services/association-admin-layout.service';
import { Menu } from '@bernardo-mg/layout';

@Component({
    selector: 'layout-association-admin-layout',
    imports: [RouterModule, SidebarLayoutContainer],
    templateUrl: './association-admin-layout.container.html'
})
export class AssociationAdminLayoutContainer implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private associationAdminLayoutService: AssociationAdminLayoutService
  ) { }

  ngOnInit(): void {
    // Load menus
    this.menus = this.associationAdminLayoutService.getMenus();
  }

}

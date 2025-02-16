import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { Menu } from '@bernardo-mg/layout';
import { AssociationAdminLayoutService } from '../../services/association-admin-layout.service';

@Component({
    selector: 'assoc-association-admin-layout',
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

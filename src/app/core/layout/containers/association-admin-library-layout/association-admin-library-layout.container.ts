import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { AssociationAdminLayoutService } from '@app/core/layout/services/association-admin-layout.service';
import { Menu } from '@bernardo-mg/layout';

@Component({
    selector: 'layout-association-admin-library-layout',
    imports: [RouterModule, SidebarLayoutContainer],
    templateUrl: './association-admin-library-layout.container.html'
})
export class AssociationAdminLibraryLayoutContainer {

  public readonly menus: Menu[] = [];

  constructor(
    associationAdminLayoutService: AssociationAdminLayoutService
  ) {
    this.menus = associationAdminLayoutService.getLibraryMenus();
  }

}

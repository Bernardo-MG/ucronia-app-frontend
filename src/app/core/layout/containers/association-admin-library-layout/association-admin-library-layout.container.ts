import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AssociationAdminLayoutService } from '@app/core/layout/services/association-admin-layout.service';
import { Menu } from '@bernardo-mg/ui';

@Component({
    selector: 'layout-association-admin-library-layout',
    imports: [RouterModule, SidebarLayoutComponent],
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

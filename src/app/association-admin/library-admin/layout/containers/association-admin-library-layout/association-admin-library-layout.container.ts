import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@bernardo-mg/ui';
import { AssociationAdminLibraryLayoutService } from '../../services/association-admin-library-layout.service';

@Component({
    selector: 'layout-association-admin-library-layout',
    imports: [RouterModule, SidebarLayoutComponent],
    templateUrl: './association-admin-library-layout.container.html'
})
export class AssociationAdminLibraryLayoutContainer {

  public readonly menus: Menu[] = [];

  constructor() {
    const service = inject(AssociationAdminLibraryLayoutService);

    this.menus = service.getLibraryMenus();
  }

}

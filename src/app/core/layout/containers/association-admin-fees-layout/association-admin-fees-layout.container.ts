import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AssociationAdminLayoutService } from '@app/core/layout/services/association-admin-layout.service';
import { Menu } from '@bernardo-mg/ui';

@Component({
  selector: 'layout-association-admin-fees-layout',
  imports: [RouterModule, SidebarLayoutComponent],
  templateUrl: './association-admin-fees-layout.container.html'
})
export class AssociationAdminFeesLayoutContainer {

  public readonly menus: Menu[];

  constructor(
    associationAdminLayoutService: AssociationAdminLayoutService
  ) {
    this.menus = associationAdminLayoutService.getFundsMenus();
  }

}

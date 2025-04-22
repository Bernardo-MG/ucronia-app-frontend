import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@bernardo-mg/ui';
import { AssociationAdminFeesLayoutService } from '../../services/association-admin-fees-layout.service';

@Component({
  selector: 'layout-association-admin-fees-layout',
  imports: [RouterModule, SidebarLayoutComponent],
  templateUrl: './association-admin-fees-layout.container.html'
})
export class AssociationAdminFeesLayoutContainer {

  public readonly menus: Menu[];

  constructor(
    service: AssociationAdminFeesLayoutService
  ) {
    this.menus = service.getFundsMenus();
  }

}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { AssociationLayoutService } from '@app/core/layout/services/association-layout.service';
import { Menu } from '@bernardo-mg/layout';

@Component({
  selector: 'layout-association-layout',
  imports: [RouterModule, SidebarLayoutContainer],
  templateUrl: './association-layout.container.html'
})
export class AssociationLayoutContainer {

  public readonly menus: Menu[];

  constructor(
    associationLayoutService: AssociationLayoutService
  ) {
    this.menus = associationLayoutService.getMenus();
  }

}

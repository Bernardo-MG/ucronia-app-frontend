import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { AssociationLayoutService } from '@app/core/layout/services/association-layout.service';
import { Menu } from '@bernardo-mg/layout';

@Component({
  selector: 'layout-association-layout',
  imports: [RouterModule, SidebarLayoutComponent],
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

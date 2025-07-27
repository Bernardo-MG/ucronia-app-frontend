import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@bernardo-mg/ui';
import { AssociationLayoutService } from '../../services/association-layout.service';

@Component({
  selector: 'layout-association-layout',
  imports: [RouterModule, SidebarLayoutComponent],
  templateUrl: './association-layout.container.html'
})
export class AssociationLayoutContainer {

  public readonly menus: Menu[];

  constructor() {
    const service = inject(AssociationLayoutService);

    this.menus = service.getMenus();
  }

}

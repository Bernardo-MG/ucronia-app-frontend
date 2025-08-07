import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterBreadcrumbComponent } from '@bernardo-mg/ui';
import { MenuItem } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { NavbarContainer } from '../../containers/navbar/navbar.container';

@Component({
  selector: 'layout-sidebar-layout',
  imports: [RouterModule, DrawerModule, MenuModule, NavbarContainer, RouterBreadcrumbComponent],
  templateUrl: './sidebar-layout.component.html'
})
export class SidebarLayoutComponent {

  public readonly menus = input<MenuItem[]>([]);

  public menuActive = false;

  public onToggleMenu(status: boolean) {
    this.menuActive = status;
  }

}

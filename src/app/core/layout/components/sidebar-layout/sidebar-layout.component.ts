import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@app/core/layout/components/side-menu/side-menu.component';
import { RouterBreadcrumbComponent } from '@bernardo-mg/ui';
import { MenuItem } from 'primeng/api';
import { NavbarContainer } from '../../containers/navbar/navbar.container';

@Component({
  selector: 'layout-sidebar-layout',
  imports: [RouterModule, SideMenuComponent, NavbarContainer, RouterBreadcrumbComponent],
  templateUrl: './sidebar-layout.component.html'
})
export class SidebarLayoutComponent {

  public readonly menus = input<MenuItem[]>([]);

}

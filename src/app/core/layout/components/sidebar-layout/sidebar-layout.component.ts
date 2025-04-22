import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@app/core/layout/components/side-menu/side-menu.component';
import { Menu, RouterBreadcrumbComponent } from '@bernardo-mg/ui';
import { NavbarContainer } from '../../containers/navbar/navbar.container';

@Component({
  selector: 'layout-sidebar-layout',
  imports: [RouterModule, SideMenuComponent, NavbarContainer, RouterBreadcrumbComponent],
  templateUrl: './sidebar-layout.component.html'
})
export class SidebarLayoutComponent {

  // TODO: the selector should be view- or similar

  @Input() public menus: Menu[] = [];

}

import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterBreadcrumbComponent } from '@bernardo-mg/ui';
import { MenuItem, MessageService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { NavbarContainer } from '../../containers/navbar/navbar.container';

@Component({
  selector: 'layout-sidebar-layout',
  imports: [RouterModule, ToastModule, DrawerModule, MenuModule, NavbarContainer, RouterBreadcrumbComponent],
  templateUrl: './sidebar-layout.component.html',
  providers: [MessageService]
})
export class SidebarLayoutComponent {

  public readonly menus = input<MenuItem[]>([]);

  public menuActive = false;

  public onToggleMenu(status: boolean) {
    this.menuActive = status;
  }

}

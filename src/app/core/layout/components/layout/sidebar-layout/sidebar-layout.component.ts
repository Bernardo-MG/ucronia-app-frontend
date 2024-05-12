import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '@app/shared/menu/models/menu';
import { LayoutService } from '../../../services/layout.service';
import { NavbarComponent } from '../../header/navbar/navbar.component';
import { SideMenuComponent } from '../../side/side-menu/side-menu.component';

@Component({
  selector: 'layout-sidebar',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent],
  templateUrl: './sidebar-layout.component.html'
})
export class SidebarLayoutComponent {

  @Input() public title = '';

  @Input() public showConfigMenu = false;

  @Input() public menus: Menu[] = [];

}

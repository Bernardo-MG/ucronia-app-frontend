import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SidebarLayoutComponent } from '@app/core/layout/components/layout/sidebar-layout/sidebar-layout.component';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { Menu } from '@app/shared/menu/models/menu';
import { SecurityLayoutService } from '../../services/security-layout.service';

@Component({
  selector: 'access-sidebar',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent, SidebarLayoutComponent],
  templateUrl: './security-layout.component.html'
})
export class SecurityLayoutComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private layoutService: LayoutService,
    private securityLayoutService: SecurityLayoutService
  ) { }

  ngOnInit(): void {
    // Load menus
    this.menus = this.securityLayoutService.getMenus();
  }

}

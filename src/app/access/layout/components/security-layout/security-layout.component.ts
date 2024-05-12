import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { Menu } from '@app/shared/menu/models/menu';
import { SecurityLayoutService } from '../../services/security-layout.service';
import { LayoutService } from '@app/core/layout/services/layout.service';

@Component({
  selector: 'layout-sidebar',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent],
  templateUrl: './security-layout.component.html'
})
export class SecurityLayoutComponent implements OnInit {

  public title = '';

  public showConfigMenu = false;

  public menus: Menu[] = [];

  constructor(
    private layoutService: LayoutService,
    private securityLayoutService: SecurityLayoutService
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();

    // Show config link
    this.showConfigMenu = this.layoutService.showConfigurationLink();

    // Load menus
    this.menus = this.securityLayoutService.getMenus();
  }

}

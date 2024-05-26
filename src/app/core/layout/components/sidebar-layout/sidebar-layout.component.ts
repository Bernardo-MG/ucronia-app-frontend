import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { Menu } from '@app/shared/menu/models/menu';

@Component({
  selector: 'layout-sidebar',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent],
  templateUrl: './sidebar-layout.component.html'
})
export class SidebarLayoutComponent implements OnInit {

  @Input() public menus: Menu[] = [];

  public title = '';

  public showConfig = false;

  public showSecurity = false;

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();

    // Show links
    this.showConfig = this.layoutService.showConfigurationLink();
    this.showSecurity = this.layoutService.showSecurityLink();
  }

}

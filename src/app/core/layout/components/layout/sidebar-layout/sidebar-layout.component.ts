import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '@app/shared/menu/models/menu';
import { NavbarComponent } from '../../header/navbar/navbar.component';
import { SideMenuComponent } from '../../side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';

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
    this.showSecurity = this.layoutService.showConfigurationLink();
  }

}

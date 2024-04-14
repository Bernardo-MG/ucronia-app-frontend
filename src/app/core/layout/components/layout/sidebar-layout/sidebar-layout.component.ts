import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '@app/shared/menu/models/menu';
import { LayoutService } from '../../../services/layout.service';
import { HeaderNavigationWrapperComponent } from '../../header/header-navigation-wrapper/header-navigation-wrapper.component';
import { NavbarComponent } from '../../header/navbar/navbar.component';
import { SideMenuComponent } from '../../side/side-menu/side-menu.component';
import { AuthContainer } from '@app/core/authentication/services/auth.service';

@Component({
  selector: 'layout-sidebar',
  standalone: true,
  imports: [RouterModule, HeaderNavigationWrapperComponent, SideMenuComponent, NavbarComponent],
  templateUrl: './sidebar-layout.component.html'
})
export class SidebarLayoutComponent implements OnInit {

  public title = '';

  public loggedIn = false;

  public showConfigMenu = false;

  public menus: Menu[] = [];

  constructor(
    private authContainer: AuthContainer,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();

    // Show config link
    this.showConfigMenu = this.layoutService.showConfigurationLink();

    // Load menus
    this.menus = this.layoutService.getMenus();

    // Check if the user is logged
    this.authContainer.getDetails().subscribe(u => { this.loggedIn = u.logged });
  }

}

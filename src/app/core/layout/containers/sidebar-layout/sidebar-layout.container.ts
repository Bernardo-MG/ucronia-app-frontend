import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/core/layout/components/navbar/navbar.component';
import { SideMenuComponent } from '@app/core/layout/components/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { AuthContainer } from '@bernardo-mg/authentication';
import { Menu, RouterBreadcrumbComponent } from '@bernardo-mg/layout';

@Component({
  selector: 'layout-sidebar-layout',
  imports: [RouterModule, SideMenuComponent, NavbarComponent, RouterBreadcrumbComponent],
  templateUrl: './sidebar-layout.container.html'
})
export class SidebarLayoutContainer {

  private authContainer = inject(AuthContainer);

  @Input() public menus: Menu[] = [];

  public title = '';

  public showSettings = false;

  public showSecurity = false;

  public showAssociation = false;

  public get loggedIn() {
    return this.authContainer.logged;
  }

  constructor(
    layoutService: LayoutService
  ) {
    // App title
    this.title = layoutService.getTitle();

    // Show links
    this.showSettings = layoutService.showSettingsLink();
    this.showSecurity = layoutService.showSecurityLink();
    this.showAssociation = layoutService.showAssociationLink();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { Menu } from '@bernardo-mg/layout';
import { RouterBreadcrumbComponent } from '@bernardo-mg/layout';

@Component({
    selector: 'layout-sidebar',
    imports: [RouterModule, SideMenuComponent, NavbarComponent, RouterBreadcrumbComponent],
    templateUrl: './sidebar-layout.container.html'
})
export class SidebarLayoutContainer implements OnInit {

  @Input() public menus: Menu[] = [];

  public title = '';

  public showSettings = false;

  public showSecurity = false;

  public showAssociation = false;

  public showAdmin = false;

  public get loggedIn() {
    return this.authContainer.isLogged();
  }

  constructor(
    private layoutService: LayoutService,
    private authContainer: AuthContainer
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();

    // Show links
    this.showSettings = this.layoutService.showSettingsLink();
    this.showSecurity = this.layoutService.showSecurityLink();
    this.showAssociation = this.layoutService.showAssociationLink();
    this.showAdmin = this.layoutService.showAssociationAdminLink();
  }

}

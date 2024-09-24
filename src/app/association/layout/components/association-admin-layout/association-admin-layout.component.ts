import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@app/shared/menu/models/menu';
import { AssociationLayoutService } from '../../services/association-layout.service';

@Component({
  selector: 'assoc-association-admin-layout',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent, SidebarLayoutComponent],
  templateUrl: './association-admin-layout.component.html'
})
export class AssociationAdminLayoutComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private associationLayoutService: AssociationLayoutService
  ) { }

  ngOnInit(): void {
    // Load menus
    this.menus = this.associationLayoutService.getAdminMenus();
  }

}

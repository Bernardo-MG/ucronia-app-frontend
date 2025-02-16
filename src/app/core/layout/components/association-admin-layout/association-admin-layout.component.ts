import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@bernardo-mg/layout';
import { AssociationAdminLayoutService } from '../../services/association-admin-layout.service';

@Component({
    selector: 'assoc-association-admin-layout',
    imports: [RouterModule, SidebarLayoutComponent],
    templateUrl: './association-admin-layout.component.html'
})
export class AssociationAdminLayoutComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private associationAdminLayoutService: AssociationAdminLayoutService
  ) { }

  ngOnInit(): void {
    // Load menus
    this.menus = this.associationAdminLayoutService.getMenus();
  }

}

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { AssociationLayoutService } from '@app/core/layout/services/association-layout.service';
import { Menu } from '@bernardo-mg/layout';

@Component({
  selector: 'layout-association-layout',
  imports: [RouterModule, SidebarLayoutContainer],
  templateUrl: './association-layout.container.html'
})
export class AssociationLayoutContainer implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private associationLayoutService: AssociationLayoutService
  ) { }

  public ngOnInit(): void {
    // Load menus
    this.menus = this.associationLayoutService.getMenus();
  }

}

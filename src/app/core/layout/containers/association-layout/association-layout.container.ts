import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutContainer } from '@app/core/layout/containers/sidebar-layout/sidebar-layout.container';
import { Menu } from '@bernardo-mg/layout';
import { AssociationLayoutService } from '../../services/association-layout.service';

@Component({
    selector: 'assoc-association-layout',
    imports: [RouterModule, SidebarLayoutContainer],
    templateUrl: './association-layout.container.html'
})
export class AssociationLayoutContainer implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private associationLayoutService: AssociationLayoutService
  ) { }

  ngOnInit(): void {
    // Load menus
    this.menus = this.associationLayoutService.getMenus();
  }

}

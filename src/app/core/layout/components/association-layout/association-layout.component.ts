import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/core/layout/components/sidebar-layout/sidebar-layout.component';
import { Menu } from '@app/shared/menu/models/menu';
import { AssociationLayoutService } from '../../services/association-layout.service';

@Component({
    selector: 'assoc-association-layout',
    imports: [RouterModule, SidebarLayoutComponent],
    templateUrl: './association-layout.component.html'
})
export class AssociationLayoutComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(
    private associationLayoutService: AssociationLayoutService
  ) { }

  ngOnInit(): void {
    // Load menus
    this.menus = this.associationLayoutService.getMenus();
  }

}

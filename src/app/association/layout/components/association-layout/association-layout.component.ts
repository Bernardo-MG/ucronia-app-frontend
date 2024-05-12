import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SideMenuComponent } from '@app/core/layout/components/side/side-menu/side-menu.component';
import { LayoutService } from '@app/core/layout/services/layout.service';
import { Menu } from '@app/shared/menu/models/menu';
import { AssociationLayoutService } from '../../services/association-layout.service';

@Component({
  selector: 'app-association-layout',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent],
  templateUrl: './association-layout.component.html'
})
export class AssociationLayoutComponent implements OnInit {

  public title = '';

  public showConfigMenu = false;

  public menus: Menu[] = [];

  constructor(
    private layoutService: LayoutService,
    private associationLayoutService: AssociationLayoutService
  ) { }

  ngOnInit(): void {
    // App title
    this.title = this.layoutService.getTitle();

    // Show config link
    this.showConfigMenu = this.layoutService.showConfigurationLink();

    // Load menus
    this.menus = this.associationLayoutService.getMenus();
  }

}

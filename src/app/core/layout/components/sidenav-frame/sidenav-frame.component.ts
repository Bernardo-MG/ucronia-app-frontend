import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'layout-sidenav-frame',
  templateUrl: './sidenav-frame.component.html'
})
export class SidenavFrameComponent {

  public title;

  public menus;

  constructor(
    layoutService: LayoutService
  ) {
    this.menus = layoutService.getMenu();
    this.title = layoutService.getTitle();
  }

}

import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'layout-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {

  public title;

  public menus;

  constructor(
    layoutService: LayoutService
  ) {
    this.menus = layoutService.getMenu();
    this.title = layoutService.getTitle();
  }

}

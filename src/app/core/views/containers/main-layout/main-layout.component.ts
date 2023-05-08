import { Component } from '@angular/core';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'view-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {

  public title;

  public menus;

  constructor(
    viewService: ViewService
  ) {
    this.menus = viewService.getMenu();
    this.title = viewService.getTitle();
  }

}

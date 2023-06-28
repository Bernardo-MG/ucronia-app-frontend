import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'view-centered-layout',
  templateUrl: './centered-layout.component.html'
})
export class CenteredLayoutComponent {

  public title ;

  constructor(
    layoutService: LayoutService
  ) {
    this.title = layoutService.getTitle();
  }

}

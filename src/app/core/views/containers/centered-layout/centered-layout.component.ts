import { Component } from '@angular/core';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'view-centered-layout',
  templateUrl: './centered-layout.component.html'
})
export class CenteredLayoutComponent {

  public title ;

  constructor(
    viewService: ViewService
  ) {
    this.title = viewService.getTitle();
  }

}

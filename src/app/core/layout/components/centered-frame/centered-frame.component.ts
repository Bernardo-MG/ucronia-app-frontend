import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'layout-centered-frame',
  templateUrl: './centered-frame.component.html'
})
export class CenteredFrameComponent {

  public title ;

  constructor(
    layoutService: LayoutService
  ) {
    this.title = layoutService.getTitle();
  }

}

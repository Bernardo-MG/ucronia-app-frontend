import { Component } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-backward',
  templateUrl: './icon-backward.component.html'
})
export class BackwardIconComponent {

  public icon = faChevronLeft;

}

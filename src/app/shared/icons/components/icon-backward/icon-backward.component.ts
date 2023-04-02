import { Component } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-backward',
  templateUrl: './icon-backward.component.html',
  styleUrls: ['./icon-backward.component.sass']
})
export class BackwardIconComponent {

  public icon = faChevronLeft;

}

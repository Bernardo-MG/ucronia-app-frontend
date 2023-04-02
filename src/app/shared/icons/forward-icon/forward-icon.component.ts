import { Component } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dnd5-forward-icon',
  templateUrl: './forward-icon.component.html',
  styleUrls: ['./forward-icon.component.sass']
})
export class ForwardIconComponent {

  public icon = faChevronRight;

}

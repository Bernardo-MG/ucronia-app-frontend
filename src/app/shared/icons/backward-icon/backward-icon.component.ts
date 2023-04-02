import { Component } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dnd5-backward-icon',
  templateUrl: './backward-icon.component.html',
  styleUrls: ['./backward-icon.component.sass']
})
export class BackwardIconComponent {

  public icon = faChevronLeft;

}

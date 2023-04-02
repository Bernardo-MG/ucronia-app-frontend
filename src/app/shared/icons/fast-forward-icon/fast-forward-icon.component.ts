import { Component } from '@angular/core';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dnd5-fast-forward-icon',
  templateUrl: './fast-forward-icon.component.html',
  styleUrls: ['./fast-forward-icon.component.sass']
})
export class FastForwardIconComponent {

  public icon = faAnglesRight;

}

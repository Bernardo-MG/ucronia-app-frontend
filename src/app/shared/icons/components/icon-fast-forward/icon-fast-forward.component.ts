import { Component } from '@angular/core';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-fast-forward',
  templateUrl: './icon-fast-forward.component.html',
  styleUrls: ['./icon-fast-forward.component.sass']
})
export class FastForwardIconComponent {

  public icon = faAnglesRight;

}

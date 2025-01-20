import { Component } from '@angular/core';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-fast-forward',
    templateUrl: './icon-fast-forward.component.html',
    standalone: false
})
export class FastForwardIconComponent {

  public icon = faAnglesRight;

}

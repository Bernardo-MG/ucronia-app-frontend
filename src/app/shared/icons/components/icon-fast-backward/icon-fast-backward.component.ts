import { Component } from '@angular/core';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-fast-backward',
    templateUrl: './icon-fast-backward.component.html',
    standalone: false
})
export class FastBackwardIconComponent {

  public icon = faAnglesLeft;

}

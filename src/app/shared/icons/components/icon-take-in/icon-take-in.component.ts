import { Component } from '@angular/core';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-take-in',
    templateUrl: './icon-take-in.component.html',
    standalone: false
})
export class IconTakeInComponent {

  public icon = faRightToBracket;

}

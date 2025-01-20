import { Component } from '@angular/core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-take-out',
    templateUrl: './icon-take-out.component.html',
    standalone: false
})
export class IconTakeOutComponent {

  public icon = faRightFromBracket;

}

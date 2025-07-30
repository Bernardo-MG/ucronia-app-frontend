
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-take-in',
    imports: [FontAwesomeModule],
    templateUrl: './icon-take-in.component.html'
})
export class IconTakeInComponent {

  public icon = faRightToBracket;

}

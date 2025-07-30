
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-take-out',
    imports: [FontAwesomeModule],
    templateUrl: './icon-take-out.component.html'
})
export class IconTakeOutComponent {

  public icon = faRightFromBracket;

}

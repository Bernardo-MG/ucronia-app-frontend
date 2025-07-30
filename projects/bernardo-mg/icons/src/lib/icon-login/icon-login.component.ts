
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-login',
    imports: [FontAwesomeModule],
    templateUrl: './icon-login.component.html'
})
export class IconLoginComponent {

  public icon = faRightToBracket;

}

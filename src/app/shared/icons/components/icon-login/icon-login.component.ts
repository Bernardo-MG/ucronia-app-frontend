import { Component } from '@angular/core';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-login',
    templateUrl: './icon-login.component.html',
    standalone: false
})
export class LoginIconComponent {

  public icon = faRightToBracket;

}

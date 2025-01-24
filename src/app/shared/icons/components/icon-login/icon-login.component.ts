import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-login',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-login.component.html'
})
export class LoginIconComponent {

  public icon = faRightToBracket;

}

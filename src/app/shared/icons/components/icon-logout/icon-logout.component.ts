import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-logout',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-logout.component.html'
})
export class LogoutIconComponent {

  public icon = faRightFromBracket;

}

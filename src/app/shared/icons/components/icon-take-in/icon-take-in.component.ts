import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-take-in',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-take-in.component.html'
})
export class IconTakeInComponent {

  public icon = faRightToBracket;

}

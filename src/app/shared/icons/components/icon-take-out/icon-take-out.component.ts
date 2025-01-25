import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-take-out',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-take-out.component.html'
})
export class IconTakeOutComponent {

  public icon = faRightFromBracket;

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-fast-backward',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-fast-backward.component.html'
})
export class FastBackwardIconComponent {

  public icon = faAnglesLeft;

}

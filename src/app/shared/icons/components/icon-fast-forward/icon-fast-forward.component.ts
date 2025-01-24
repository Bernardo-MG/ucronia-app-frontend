import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-fast-forward',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-fast-forward.component.html'
})
export class FastForwardIconComponent {

  public icon = faAnglesRight;

}

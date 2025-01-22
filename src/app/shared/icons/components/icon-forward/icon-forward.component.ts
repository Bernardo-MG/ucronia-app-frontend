import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-forward',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-forward.component.html'
})
export class ForwardIconComponent {

  public icon = faChevronRight;

}

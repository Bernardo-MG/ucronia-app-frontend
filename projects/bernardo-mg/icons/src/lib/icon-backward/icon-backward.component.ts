import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-backward',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-backward.component.html'
})
export class IconBackwardComponent {

  public icon = faChevronLeft;

}

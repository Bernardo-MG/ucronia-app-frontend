
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-forward',
    imports: [FontAwesomeModule],
    templateUrl: './icon-forward.component.html'
})
export class IconForwardComponent {

  public icon = faChevronRight;

}

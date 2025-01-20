import { Component } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-forward',
    templateUrl: './icon-forward.component.html',
    standalone: false
})
export class ForwardIconComponent {

  public icon = faChevronRight;

}

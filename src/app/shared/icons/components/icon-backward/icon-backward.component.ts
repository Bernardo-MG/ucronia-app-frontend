import { Component } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-backward',
    templateUrl: './icon-backward.component.html',
    standalone: false
})
export class BackwardIconComponent {

  public icon = faChevronLeft;

}

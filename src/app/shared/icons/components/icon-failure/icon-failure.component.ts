import { Component } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-failure',
    templateUrl: './icon-failure.component.html',
    standalone: false
})
export class IconFailureComponent {

  public icon = faX;

}

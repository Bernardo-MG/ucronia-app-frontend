import { Component } from '@angular/core';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-person',
    templateUrl: './icon-person.component.html',
    standalone: false
})
export class IconPersonComponent {

  public icon = faPerson;

}

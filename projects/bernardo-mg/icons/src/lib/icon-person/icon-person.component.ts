
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-person',
    imports: [FontAwesomeModule],
    templateUrl: './icon-person.component.html'
})
export class IconPersonComponent {

  public icon = faPerson;

}


import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-edit',
    imports: [FontAwesomeModule],
    templateUrl: './icon-edit.component.html'
})
export class IconEditComponent {

  public icon = faPenToSquare;

}

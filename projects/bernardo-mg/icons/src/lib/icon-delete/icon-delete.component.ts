
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-delete',
    imports: [FontAwesomeModule],
    templateUrl: './icon-delete.component.html'
})
export class IconDeleteComponent {

  public icon = faTrashCan;

}

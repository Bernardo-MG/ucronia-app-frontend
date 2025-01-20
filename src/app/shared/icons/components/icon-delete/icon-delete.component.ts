import { Component } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-delete',
    templateUrl: './icon-delete.component.html',
    standalone: false
})
export class DeleteIconComponent {

  public icon = faTrashCan;

}

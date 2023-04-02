import { Component } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-delete',
  templateUrl: './icon-delete.component.html',
  styleUrls: ['./icon-delete.component.sass']
})
export class DeleteIconComponent {

  public icon = faTrashCan;

}

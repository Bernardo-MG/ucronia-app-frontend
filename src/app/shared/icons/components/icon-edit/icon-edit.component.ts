import { Component } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-edit',
  templateUrl: './icon-edit.component.html',
  styleUrls: ['./icon-edit.component.sass']
})
export class IconEditComponent {

  public icon = faPenToSquare;

}

import { Component } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-edit',
  templateUrl: './icon-edit.component.html'
})
export class IconEditComponent {

  public icon = faPenToSquare;

}

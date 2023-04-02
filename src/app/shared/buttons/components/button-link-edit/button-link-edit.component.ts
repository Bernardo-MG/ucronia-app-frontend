import { Component, Input } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button-link-edit',
  templateUrl: './button-link-edit.component.html',
  styleUrls: ['./button-link-edit.component.sass']
})
export class ButtonLinkEditComponent {

  @Input() link: string = "";

  public icon = faPenToSquare;

  constructor() { }

}

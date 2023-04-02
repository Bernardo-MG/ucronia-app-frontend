import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-link-edit',
  templateUrl: './button-link-edit.component.html',
  styleUrls: ['./button-link-edit.component.sass']
})
export class ButtonLinkEditComponent {

  @Input() link: string = "";

  constructor() { }

}

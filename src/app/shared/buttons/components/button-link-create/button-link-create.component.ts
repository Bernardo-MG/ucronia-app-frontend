import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-link-create',
  templateUrl: './button-link-create.component.html',
  styleUrls: ['./button-link-create.component.sass']
})
export class ButtonLinkCreateComponent {

  @Input() link: string = "";

  constructor() { }

}

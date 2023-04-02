import { Component, Input } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button-link-create',
  templateUrl: './button-link-create.component.html',
  styleUrls: ['./button-link-create.component.sass']
})
export class ButtonLinkCreateComponent {

  @Input() link: string = "";

  public icon = faCirclePlus;

  constructor() { }

}

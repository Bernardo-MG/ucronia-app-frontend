import { Component } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-create',
  templateUrl: './icon-create.component.html',
  styleUrls: ['./icon-create.component.sass']
})
export class IconCreateComponent {

  public icon = faCirclePlus;

}

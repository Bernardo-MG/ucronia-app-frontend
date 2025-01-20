import { Component } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-create',
    templateUrl: './icon-create.component.html',
    standalone: false
})
export class IconCreateComponent {

  public icon = faCirclePlus;

}

import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-add',
    templateUrl: './icon-add.component.html',
    standalone: false
})
export class IconAddComponent {

  public icon = faPlus;

}

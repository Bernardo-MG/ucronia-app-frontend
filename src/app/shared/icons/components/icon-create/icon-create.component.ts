import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-create',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-create.component.html'
})
export class IconCreateComponent {

  public icon = faCirclePlus;

}

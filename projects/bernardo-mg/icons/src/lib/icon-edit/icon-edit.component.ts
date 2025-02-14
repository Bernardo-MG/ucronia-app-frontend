import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-edit',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-edit.component.html'
})
export class IconEditComponent {

  public icon = faPenToSquare;

}

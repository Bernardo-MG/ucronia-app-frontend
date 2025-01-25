import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-delete',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-delete.component.html'
})
export class DeleteIconComponent {

  public icon = faTrashCan;

}

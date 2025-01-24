import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-save',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-save.component.html'
})
export class IconSaveComponent {

  public icon = faFloppyDisk;

}

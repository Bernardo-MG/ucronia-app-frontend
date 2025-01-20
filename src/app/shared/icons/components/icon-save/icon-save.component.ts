import { Component } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-save',
    templateUrl: './icon-save.component.html',
    standalone: false
})
export class IconSaveComponent {

  public icon = faFloppyDisk;

}

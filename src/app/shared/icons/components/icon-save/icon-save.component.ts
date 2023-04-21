import { Component } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-save',
  templateUrl: './icon-save.component.html'
})
export class IconSaveComponent {

  public icon = faFloppyDisk;

}

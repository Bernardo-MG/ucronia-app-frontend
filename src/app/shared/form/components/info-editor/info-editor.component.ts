import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-info-editor',
  templateUrl: './info-editor.component.html'
})
export class InfoEditorComponent {

  @Input() public editing = false;

}

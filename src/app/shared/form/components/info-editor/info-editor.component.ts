import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';
import { EditorHeaderComponent } from '../editor-header/editor-header.component';

@Component({
  selector: 'form-info-editor',
  standalone: true,
  imports: [CommonModule, IconsModule, EditorHeaderComponent],
  templateUrl: './info-editor.component.html'
})
export class InfoEditorComponent {

  @Input() public editing = false;

}

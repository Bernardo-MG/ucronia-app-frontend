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

  @Input() public editable = false;

  @Input() public editing = false;

  @Input() public deletable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  public get showMenu() {
    return this.editable || this.deletable;
  }

  public onStartEditing(): void {
    this.startEditing.emit();
  }

  public onDelete(): void {
    this.delete.emit();
  }

}

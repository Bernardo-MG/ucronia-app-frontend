import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'layout-info-editor-wrapper',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './info-editor-wrapper.component.html'
})
export class InfoEditorWrapperComponent {

  @Input() public editable = false;

  @Input() public editing = false;

  @Input() public deletable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  public onStartEditing(): void {
    this.startEditing.emit();
  }

  public onDelete(): void {
    this.delete.emit();
  }

  public showMenu() {
    return this.editable || this.deletable;
  }

}

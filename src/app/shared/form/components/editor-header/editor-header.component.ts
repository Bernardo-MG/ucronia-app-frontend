import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'form-editor-header',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './editor-header.component.html'
})
export class EditorHeaderComponent {

  @Input() public editable = false;

  @Input() public deletable = false;

  @Output() public startEditing = new EventEmitter<void>();

  @Output() public delete = new EventEmitter<void>();

  public onStartEditing(): void {
    this.startEditing.emit();
  }

  public onDelete(): void {
    this.delete.emit();
  }

}

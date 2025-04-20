import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDeleteComponent, IconEditComponent } from '@bernardo-mg/icons';
import { ModalComponent } from '@bernardo-mg/layout';

@Component({
  selector: 'form-control-buttons',
  imports: [IconDeleteComponent, IconEditComponent, ModalComponent],
  templateUrl: './control-buttons.component.html'
})
export class ControlButtonsComponent {

  @Input() public disabled = false;

  @Input() public editable = false;

  @Input() public deletable = false;

  @Output() public startEditing = new EventEmitter<void>();

  @Output() public delete = new EventEmitter<void>();

  public get editableDisabled() {
    return this.disabled || !this.editable;
  }

  public get deletableDisabled() {
    return this.disabled || !this.deletable;
  }

  public onDelete(): void {
    if (!this.deletableDisabled) {
      this.delete.emit();
    }
  }

}

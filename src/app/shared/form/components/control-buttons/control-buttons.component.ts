import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { DeleteIconComponent, EditIconComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'form-control-buttons',
    imports: [DeleteIconComponent, EditIconComponent, ModalComponent],
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

  public onStartEditing(): void {
    this.startEditing.emit();
  }

  public onDelete(): void {
    this.delete.emit();
  }

}

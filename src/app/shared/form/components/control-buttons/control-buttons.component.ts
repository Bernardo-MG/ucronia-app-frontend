import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'form-control-buttons',
    templateUrl: './control-buttons.component.html',
    standalone: false
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

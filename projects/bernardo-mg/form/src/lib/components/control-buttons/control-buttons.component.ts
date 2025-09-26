import { Component, Input, output } from '@angular/core';
import { ModalComponent } from '@bernardo-mg/ui';

@Component({
  selector: 'form-control-buttons',
  imports: [ModalComponent],
  templateUrl: './control-buttons.component.html'
})
export class ControlButtonsComponent {

  @Input() public disabled = false;

  @Input() public editable = false;

  @Input() public deletable = false;

  public readonly startEditing = output<void>();

  public readonly delete = output<void>();

  public get editableDisabled() {
    return this.disabled || !this.editable;
  }

  public get deletableDisabled() {
    return this.disabled || !this.deletable;
  }

  public onDelete(): void {
    if (!this.deletableDisabled) {
      // TODO: The 'emit' function requires a mandatory void argument
      this.delete.emit();
    }
  }

}

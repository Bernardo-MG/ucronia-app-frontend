import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'edition-form-frame',
  templateUrl: './form-frame.component.html'
})
export class FormFrameComponent {

  /**
   * Saving flag.
   */
  @Input() public saving = false;

  @Input() public formValid = false;

  @Input() public disabled = false;

  @Input() public editable = true;

  @Output() public save = new EventEmitter<void>();

  @Output() public cancel = new EventEmitter<void>();

  public saveIcon = faFloppyDisk;

  public onSave(): void {
    this.save.emit();
  }

  public isDisabled() {
    return this.disabled || !this.editable || !this.isAbleToSave();
  }

  private isAbleToSave() {
    return ((this.formValid) && (!this.saving));
  }

}

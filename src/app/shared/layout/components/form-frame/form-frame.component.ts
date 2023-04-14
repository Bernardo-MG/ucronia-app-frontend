import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'layout-form-frame',
  templateUrl: './form-frame.component.html',
  styleUrls: ['./form-frame.component.sass']
})
export class FormFrameComponent {

  /**
   * Saving flag.
   */
  @Input() public saving = false;

  @Input() public formValid = false;

  @Input() public disabled = false;

  @Output() public save = new EventEmitter<void>();

  @Output() public cancel = new EventEmitter<void>();

  public saveIcon = faFloppyDisk;

  public onSave(): void {
    this.save.emit();
  }

  public isDisabled() {
    return this.disabled || !this.isAbleToSave();
  }

  private isAbleToSave() {
    return ((this.formValid) && (!this.saving));
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'edition-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent {

  /**
   * Saving flag.
   */
  @Input() public saving = false;

  @Input() public formValid = false;

  @Input() public disabled = false;

  @Input() public editable = true;

  @Input() public fields: FormDescription[] = [];

  @Input() public failures: Failure[] = [];

  @Input() public data: any;

  @Output() public save = new EventEmitter<any>();

  @Output() public cancel = new EventEmitter<void>();

  public editing = false;

  public onSave() {
    this.save.emit(this.data);
    this.editing = false;
  }

  public onStartEditing() {
    this.editing = true;
  }

  public isAbleToSave() {
    return ((this.formValid) && (!this.saving));
  }

  public onFormValidChange(valid: boolean) {
    this.formValid = valid;
  }

  public onFormChange(value: any) {
    this.data = value;
  }

  public isDisabled() {
    return this.disabled || this.saving;
  }

  public isEditable() {
    return this.editable && this.editing;
  }

}

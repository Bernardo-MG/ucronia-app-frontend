import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FormDescription } from '../../models/form-description';
import { Failure } from '@app/core/api/models/failure';

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

  @Input() public fields: FormDescription[] = [];

  @Input() public failures: Failure[] = [];

  @Input() public data: any;

  @Output() public save = new EventEmitter<any>();

  @Output() public cancel = new EventEmitter<void>();

  public onSave(): void {
    this.save.emit(this.data);
  }

  public isAbleToSave() {
    return ((this.formValid) && (!this.saving));
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: any) {
    this.data = value;
  }

  public isDisabled() {
    return this.disabled || this.saving;
  }

}

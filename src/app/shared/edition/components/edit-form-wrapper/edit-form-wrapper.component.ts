import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'edition-edit-form-wrapper',
  templateUrl: './edit-form-wrapper.component.html'
})
export class EditFormWrapperComponent {

  /**
   * Saving flag.
   */
  @Input() public saving = false;

  @Input() public editable = false;

  @Input() public deletable = false;

  @Input() public valid = false;

  @Input() public fields: FormDescription[] = [];

  @Input() public failures: Failure[] = [];

  @Input() public data: any;

  @Output() public save = new EventEmitter<any>();

  @Output() public cancel = new EventEmitter<void>();

  @Output() public delete = new EventEmitter<any>();

  @Output() public edit = new EventEmitter<any>();

  public editing = false;

  public onSave() {
    this.save.emit(this.data);
    this.editing = false;
  }

  public onStartEditing() {
    this.editing = true;
    this.edit.emit();
  }

  public onDelete() {
    this.delete.emit(this.data);
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

  public isDisabled() {
    return this.saving;
  }

  public isAbleToEdit() {
    return !this.saving && this.editable && this.editing;
  }

  public isAbleToDelete() {
    return !this.saving && this.deletable && !this.editing;
  }

  public isSaveDisabled() {
    return !this.editable || !this.isAbleToSave();
  }

}

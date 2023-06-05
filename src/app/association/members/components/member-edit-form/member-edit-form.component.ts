import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/association/models/member';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';

@Component({
  selector: 'assoc-member-edit-form',
  templateUrl: './member-edit-form.component.html'
})
export class MemberEditFormComponent {

  /**
   * Loading flag.
   */
  @Input() public saving = false;

  @Input() public failures: Failure[] = [];

  @Input() public fields: FormDescription[] = [];

  @Input() public editable = false;

  @Input() public deletable = false;

  @Input() public data: any;

  @Output() public save = new EventEmitter<Member>();

  @Output() public delete = new EventEmitter<Member>();

  public formValid = false;

  public editing = false;

  public onSave() {
    this.save.emit(this.data);
    this.editing = false;
  }

  public onEdit(): void {
    this.editing = true;
  }

  public onFormValidChange(valid: boolean) {
    this.formValid = valid;
  }

  public onFormChange(value: any) {
    this.data = value;
  }

  public isDisabled() {
    return this.saving;
  }

  public isEditable() {
    return this.editable && this.editing;
  }

}

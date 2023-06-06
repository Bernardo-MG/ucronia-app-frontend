import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Member } from '@app/association/models/member';
import { FormBaseComponent } from '@app/shared/edition/components/form-base/form-base.component';

@Component({
  selector: 'assoc-member-edit-form',
  templateUrl: './member-edit-form.component.html'
})
export class MemberEditFormComponent extends FormBaseComponent {

  @Input() public deletable = false;

  @Output() public delete = new EventEmitter<Member>();

  public editing = false;

  constructor(
    fb: FormBuilder
  ){
    super(fb.group({
      name: ['', Validators.required],
      surname: [''],
      identifier: [''],
      phone: [''],
      active: [true, Validators.required]
    }))
  }

  public onEdit(): void {
    this.editing = true;
  }

  public onValidChange(valid: boolean) {
    this.valid = valid;
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

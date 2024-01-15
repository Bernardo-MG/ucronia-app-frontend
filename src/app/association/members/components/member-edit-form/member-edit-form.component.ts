import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { Member } from '../../models/member';

@Component({
  selector: 'assoc-member-edit-form',
  templateUrl: './member-edit-form.component.html'
})
export class MemberEditionFormComponent extends FormComponent<Member> {

  @Input() public override set data(value: Member) {
    super.data = value;
    this.member = value;
  }

  public member = new Member();

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: fb.group({
        firstName: [null, Validators.required],
        lastName: ['']
      }),
      identifier: [''],
      phone: ['']
    });
  }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Member } from '@app/association/models/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'assoc-member-edit-form',
  templateUrl: './member-edit-form.component.html'
})
export class MemberEditionFormComponent extends FormComponent<Member> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      id: [null],
      name: ['', Validators.required],
      surname: [''],
      identifier: [''],
      phone: [''],
      active: [true, Validators.required]
    });
  }

}
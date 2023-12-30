import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { Member } from '../../models/member';

@Component({
  selector: 'assoc-member-create-form',
  templateUrl: './member-create-form.component.html'
})
export class MemberCreateFormComponent extends FormComponent<Member> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['', Validators.required],
      surname: [''],
      identifier: [''],
      phone: ['']
    });
  }

}

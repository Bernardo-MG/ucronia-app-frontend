import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Member } from '@app/association/models/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';

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
      id: [null],
      name: ['', Validators.required],
      surname: [''],
      identifier: [''],
      phone: ['']
    });
  }

}

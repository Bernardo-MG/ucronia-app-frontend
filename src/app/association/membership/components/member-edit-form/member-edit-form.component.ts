import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { Member } from '../../models/member';

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
      number: [-1],
      name: ['', Validators.required],
      surname: [''],
      identifier: [''],
      phone: ['']
    });
  }

  protected override loadData(data: Member) {
    super.loadData(data);
    this.form.controls['name'].setValue(data.name.firstName);
    this.form.controls['surname'].setValue(data.name.lastName);
  }

}

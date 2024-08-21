import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';
import { Member } from '../../../models/member';

@Component({
  selector: 'assoc-member-form',
  standalone: true,
  imports: [CommonModule, FormModule, SaveControlsComponent],
  templateUrl: './member-form.component.html'
})
export class MemberFormComponent extends FormComponent<Member> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: fb.group({
        firstName: [null],
        lastName: ['']
      }),
      identifier: [''],
      phone: ['']
    });
  }

}

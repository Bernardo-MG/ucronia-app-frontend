import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { Member } from '../../models/member';
import { LayoutModule } from '@app/shared/layout/layout.module';

@Component({
  selector: 'assoc-member-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LayoutModule],
  templateUrl: './member-form.component.html'
})
export class MemberFormComponent extends FormComponent<Member> {

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

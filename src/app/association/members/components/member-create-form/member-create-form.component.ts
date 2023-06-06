import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBaseComponent } from '@app/shared/edition/components/form-base/form-base.component';

@Component({
  selector: 'assoc-member-create-form',
  templateUrl: './member-create-form.component.html'
})
export class MemberCreateFormComponent extends FormBaseComponent {

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

}

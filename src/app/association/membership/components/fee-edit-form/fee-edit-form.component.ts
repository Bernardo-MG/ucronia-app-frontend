import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { Fee } from '../../models/fee';

@Component({
  selector: 'assoc-fee-edit-form',
  templateUrl: './fee-edit-form.component.html'
})
export class FeeEditFormComponent extends FormComponent<Fee> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      id: [-1],
      memberId: [null, [Validators.required, Validators.min(0)]],
      memberName: [null, Validators.required],
      date: [null, Validators.required],
      paid: [false, Validators.required]
    });
  }

}
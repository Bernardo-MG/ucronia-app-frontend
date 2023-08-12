import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Fee } from '@app/association/models/fee';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'assoc-fee-form',
  templateUrl: './fee-form.component.html'
})
export class FeeFormComponent extends FormComponent<Fee> {

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
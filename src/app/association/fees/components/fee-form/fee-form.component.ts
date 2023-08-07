import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Fee } from '@app/association/models/fee';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'assoc-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent extends FormComponent<Fee> {

  constructor(
    fb: FormBuilder
  ) {
    super(fb.group({
      id: [-1],
      memberId: [null, Validators.required],
      date: [new Date(), Validators.required],
      paid: [false, Validators.required]
    }));
  }

}

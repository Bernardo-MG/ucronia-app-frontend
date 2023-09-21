import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'assoc-funds-form',
  templateUrl: './funds-form.component.html'
})
export class FundsFormComponent extends FormComponent<Transaction> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      id: [-1],
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [0, Validators.required]
    });
  }

}

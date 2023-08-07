import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Transaction } from '@app/association/models/transaction';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'assoc-transaction-form',
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent extends FormComponent<Transaction> {

  constructor(
    fb: FormBuilder
  ) {
    super(fb.group({
      id: [-1],
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [0, Validators.required]
    }));
  }

}

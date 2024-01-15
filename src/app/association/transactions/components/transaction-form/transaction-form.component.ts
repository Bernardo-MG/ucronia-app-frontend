import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'assoc-transaction-form',
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent extends FormComponent<Transaction> {

  @Input() public override set data(value: Transaction) {
    super.data = value;
    this.transaction = value;
  }

  public transaction = new Transaction();

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [0, Validators.required]
    });
  }

}

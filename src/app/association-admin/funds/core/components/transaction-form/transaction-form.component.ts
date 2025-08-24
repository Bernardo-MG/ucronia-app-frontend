
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';
import { Transaction } from '@app/domain/transactions/transaction';

@Component({
  selector: 'assoc-transaction-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent extends FormComponent<Transaction> {

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [0, Validators.required]
    });
  }

}

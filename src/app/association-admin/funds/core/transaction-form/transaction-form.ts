
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '@app/domain/transactions/transaction';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-transaction-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, SaveControlsComponent],
  templateUrl: './transaction-form.html'
})
export class TransactionForm extends FormComponent<Transaction> {

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

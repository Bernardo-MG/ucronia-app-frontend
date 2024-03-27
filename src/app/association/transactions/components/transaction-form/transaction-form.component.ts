import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'assoc-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LayoutModule],
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent extends FormComponent<Transaction> {

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

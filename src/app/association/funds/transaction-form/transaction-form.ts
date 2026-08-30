import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Transaction } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'assoc-transaction-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, TextareaModule, DatePickerModule, InputNumberModule, MessageModule],
  templateUrl: './transaction-form.html'
})
export class TransactionForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: Transaction) {
    this.form.patchValue({
      ...value,
      type: value.amount < 0 ? TransactionType.EXPENSE : TransactionType.INCOME,
      amount: Math.abs(value.amount)
    });
  }

  public readonly save = output<Transaction>();
  public readonly cancel = output<void>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public today = new Date();

  public readonly TransactionType = TransactionType;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      index: [0],
      type: [TransactionType.INCOME, Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public setTransactionType(type: TransactionType): void {
    this.form.get('type')?.setValue(type);
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      const { type, ...transaction } = this.form.value;

      transaction.amount = type === TransactionType.EXPENSE
        ? -Math.abs(transaction.amount)
        : Math.abs(transaction.amount);

      this.save.emit(transaction);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}

enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}
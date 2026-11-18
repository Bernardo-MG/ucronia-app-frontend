import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Transaction, TransactionType } from '@ucronia/domain';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'assoc-transaction-form',
  imports: [ReactiveFormsModule, TextareaModule, DatePickerModule, InputNumberModule, MessageModule, SelectModule],
  templateUrl: './transaction-form.html'
})
export class TransactionForm {

  @Input() public set data(value: Transaction) {
    this.form.patchValue({
      ...value,
      transactionType: value.transactionType ?? null,
      type: value.amount < 0 ? TransactionDirection.EXPENSE : TransactionDirection.INCOME,
      amount: Math.abs(value.amount)
    });
  }
  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }
  public readonly types = input<TransactionType[]>([]);

  public readonly save = output<Transaction>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
  public readonly today = new Date();
  public readonly TransactionDirection = TransactionDirection;

  public constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.group({
      index: [0],
      transactionType: formBuilder.control<number | null>(null),
      type: [TransactionDirection.INCOME, Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });

    this.formStatus = new FormStatus(this.form);
  }

  // Event handlers
  /**
   * Handler for the save event.
   */
  public onSave(): void {
    this.form.markAllAsTouched();
    if (this.saveEnabled) {
      const { type, ...transaction } = this.form.value;
      transaction.amount = type === TransactionDirection.EXPENSE
        ? -Math.abs(transaction.amount)
        : Math.abs(transaction.amount);
      if (!this.form.get('transactionType')?.dirty) {
        delete transaction.transactionType;
      } else if (transaction.transactionType == null) {
        if (transaction.index) {
          transaction.transactionType = 0;
        } else {
          delete transaction.transactionType;
        }
      }
      this.save.emit(transaction);
    }
  }

  public setTransactionType(type: TransactionDirection): void {
    this.form.get('type')?.setValue(type);
  }

  // Public methods
  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}

enum TransactionDirection {
  INCOME = 'income',
  EXPENSE = 'expense'
}

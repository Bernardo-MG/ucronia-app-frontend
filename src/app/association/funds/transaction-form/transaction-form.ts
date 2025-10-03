
import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '@app/domain/transactions/transaction';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-transaction-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule],
  templateUrl: './transaction-form.html'
})
export class TransactionForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: Transaction) {
    this.form.patchValue(value as any);
  }

  public readonly save = output<Transaction>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public today = new Date();

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      index: [0],
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [0, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public onMonthSelect(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    let dateValue;
    if (month < 10) {
      dateValue = `${year}-0${month}`;
    } else {
      dateValue = `${year}-${month}`;
    }

    this.form.get('month')?.setValue(dateValue, { emitEvent: false });
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}

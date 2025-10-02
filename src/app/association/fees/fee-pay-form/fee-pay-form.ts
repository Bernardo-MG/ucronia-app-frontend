
import { Component, Input, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { Member } from '@app/domain/members/member';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { JustifyCenterDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-pay-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, FloatLabelModule, DatePickerModule, MessageModule, JustifyCenterDirective],
  templateUrl: './fee-pay-form.html'
})
export class FeePayForm {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set member(value: Member) {
    this.form.get('member')?.setValue(value.number);
    this.months.clear();
    this.addDate();
    this.fullname = value.name.fullName;
  }

  public readonly save = output<FeePayment>();

  private fb = inject(FormBuilder);

  public formStatus: FormStatus;

  public memberName = "";

  public form: FormGroup;

  public fullname = "";

  public today = new Date();

  public get months(): FormArray {
    return this.form.get('months') as FormArray;
  }

  constructor() {
    this.form = this.fb.group({
      paymentDate: [null, Validators.required],
      member: [null, Validators.required],
      months: this.fb.array([], Validators.required)
    });

    this.formStatus = new FormStatus(this.form);
  }

  public addDate() {
    this.months.push(this.fb.control(undefined));
  }

  public removeDate(index: number): void {
    this.months.removeAt(index);
  }

  public onMonthSelect(date: Date, index: number) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    let dateValue;
    if (month < 10) {
      dateValue = `${year}-0${month}`;
    } else {
      dateValue = `${year}-${month}`;
    }

    this.months.at(index).setValue(dateValue, { emitEvent: false });
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

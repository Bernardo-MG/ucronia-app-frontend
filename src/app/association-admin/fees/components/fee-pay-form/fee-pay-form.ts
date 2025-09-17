
import { Component, Input, inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { Member } from '@app/domain/members/member';
import { FormComponent } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective, WaitingDirective } from '@bernardo-mg/ui';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-pay-form',
  imports: [FormsModule, ReactiveFormsModule, FloatLabelModule, DatePickerModule, MessageModule, IconAddComponent, IconDeleteComponent, JustifyCenterDirective, WaitingDirective],
  templateUrl: './fee-pay-form.html'
})
export class FeePayForm extends FormComponent<FeePayment> {

  private fb = inject(FormBuilder);

  @Input() public set member(value: Member) {
    this.form.get('member')?.setValue(value.number);
    this.fullname = value.name.fullName;
  }

  public fullname = "";

  public get months(): FormArray {
    return this.form.get('months') as FormArray;
  }

  constructor() {
    super();

    this.form = this.fb.group({
      paymentDate: [null, Validators.required],
      member: [null, Validators.required],
      months: this.fb.array([''], Validators.required)
    });
  }

  public addDate() {
    this.months.push(this.fb.control(''));
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

}

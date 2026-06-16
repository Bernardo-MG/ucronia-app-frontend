
import { Component, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { PublicMember } from '@ucronia/domain';
import { isSameMonth } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-payments-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, FloatLabelModule, DatePickerModule, MessageModule, InputGroupModule, InputGroupAddonModule, MemberSearch],
  templateUrl: './fee-payments-form.html'
})
export class FeePaymentsForm {

  private fb = inject(FormBuilder);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly members = input<PublicMember[]>([]);

  public readonly save = output<FeesPaymentEvent>();
  public readonly searchMember = output<MemberSearchEvent>();

  public formStatus: FormStatus;

  public form: FormGroup;

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

  public onSelectMember(member: PublicMember) {
    if (!member) {
      return;
    }

    this.form.get('member')?.setValue(member.number);

    if (this.months.length === 0) {
      this.addDate();
    }
  }

  public addDate() {
    this.months.push(this.fb.control(undefined));
  }

  public removeDate(index: number): void {
    this.months.removeAt(index);
  }

  public onMonthSelect(date: Date, index: number) {
    const controlValue = this.months.at(index).value;

    // If your form stores a Date:
    const currentDate = controlValue instanceof Date
      ? controlValue
      : new Date(controlValue);

    if (!isSameMonth(currentDate, date)) {
      this.months.at(index).setValue(date, { emitEvent: false });
    }
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

export class FeesPaymentEvent {
  public member = 0;
  public paymentDate = { date: new Date() };
  public months: Date[] = [];
}

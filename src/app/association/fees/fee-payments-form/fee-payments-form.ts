
import { Component, Input, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { FeePayments, Member } from '@ucronia/domain';
import { isSameMonth } from 'date-fns';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-payments-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, FloatLabelModule, DatePickerModule, MessageModule, AutoCompleteModule],
  templateUrl: './fee-payments-form.html'
})
export class FeePaymentsForm {

  private fb = inject(FormBuilder);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly members = input<Member[]>([]);

  public selectedMember?: Member;

  @Input() public set member(value: Member) {
    if (value) {
      this.selectedMember = value;
      this.form.get('member')?.setValue(value.number);
      this.months.clear();
      this.addDate();
    }
  }

  public readonly save = output<FeePayments>();
  public readonly search = output<FeeSearch>();
  public readonly return = output();

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

  public onSelectMember(member: Member) {
    if (!member) {
      return;
    }

    this.selectedMember = member;
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

export class FeeSearch {
  public query: string = '';
}

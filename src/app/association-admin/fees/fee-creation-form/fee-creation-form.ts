
import { Component, Input, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@app/core/form/form-status/form-status';
import { FeeCreation } from '@app/domain/fees/fee-creation';
import { Member } from '@app/domain/members/member';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-creation-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule],
  templateUrl: './fee-creation-form.html'
})
export class FeeCreationForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  @Input() public set member(value: Member) {
    this.form.get('member')?.setValue(value.number);
    this.memberName = value.name.fullName;
  }

  public readonly save = output<FeeCreation>();

  public formStatus: FormStatus;

  public memberName = "";

  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      member: [null, Validators.required],
      month: ['', Validators.required]
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

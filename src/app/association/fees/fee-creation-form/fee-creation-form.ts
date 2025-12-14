
import { Component, Input, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeeCreation } from "@ucronia/domain";
import { Member } from "@ucronia/domain";
import { FormStatus } from '@bernardo-mg/form';
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
    // TODO: this is just a patch
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const formatted = `${year}-${month}`;

    this.form.get('month')?.setValue(formatted, { emitEvent: false });
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


import { Component, Input, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fee } from "@ucronia/domain";
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { DetailField } from '@bernardo-mg/ui';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'assoc-fee-edition-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, InputGroupModule, InputGroupAddonModule, DetailField],
  templateUrl: './fee-edition-form.html'
})
export class FeeEditionForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set data(value: Fee) {
    this.form.patchValue(value as any);
    this.onMonthSelect(value.month);
    this.fee = value;
  }

  public readonly save = output<Fee>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public fee = new Fee();

  public today = new Date();

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      member: fb.group({
        number: [null, Validators.required]
      }),
      month: ['', Validators.required],
      transaction: fb.group({
        index: [null],
        date: ['', Validators.required]
      })
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

    if (this.form.get('month')?.value !== formatted) {
      this.form.get('month')?.setValue(formatted, { emitEvent: false });
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
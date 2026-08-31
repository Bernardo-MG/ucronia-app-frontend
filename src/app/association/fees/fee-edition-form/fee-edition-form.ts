import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Fee } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-edition-form',
  imports: [CurrencyPipe, DatePipe, ReactiveFormsModule, ButtonModule, DatePickerModule, MessageModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './fee-edition-form.html'
})
export class FeeEditionForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set data(value: Fee) {
    this.form.reset({ transaction: { date: value.transaction?.date ?? null } });
    this.fee = value;
  }

  public readonly save = output<FeeEditionEvent>();
  public readonly cancel = output<void>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public fee = new Fee();

  public today = new Date();

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      transaction: fb.group({
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

  public onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}

export class FeeEditionEvent {
  public transaction = { date: new Date() };
}
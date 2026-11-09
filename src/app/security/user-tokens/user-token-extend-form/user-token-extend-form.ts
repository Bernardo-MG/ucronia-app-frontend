import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'access-user-token-extend-form',
  imports: [ReactiveFormsModule, DatePickerModule, MessageModule],
  templateUrl: './user-token-extend-form.html'
})
export class UserTokenExtendForm {

  @Input() public set expirationDate(value: Date) {
    this.form.get('expirationDate')?.setValue(value);
  }
  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly save = output<Date>();

  public readonly form;
  public readonly formStatus: FormStatus;
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
  public readonly today = new Date();

  public constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      expirationDate: [new Date(), Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  // Event handlers
  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      // Valid form, can emit data
      this.save.emit(this.form.value.expirationDate as Date);
    }
  }

  // Public methods
  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}

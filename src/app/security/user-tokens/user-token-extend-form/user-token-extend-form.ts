import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'access-user-token-extend-form',
  imports: [DrawerFormActions, FormsModule, ReactiveFormsModule, DatePickerModule, ButtonModule, MessageModule],
  templateUrl: './user-token-extend-form.html'
})
export class UserTokenExtendForm {

  public readonly cancelEdition = output<void>();

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set expirationDate(value: Date) {
    this.form.get('expirationDate')?.setValue(value);
  }

  public formStatus: FormStatus;

  public readonly form;

  public readonly save = output<Date>();

  public readonly today = new Date();

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      expirationDate: [new Date(), Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value.expirationDate as Date);
    }
  }

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
}

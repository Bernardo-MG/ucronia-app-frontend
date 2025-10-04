import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'access-user-token-extend-form',
  imports: [FormsModule, ReactiveFormsModule, FloatLabelModule, DatePickerModule, ButtonModule, MessageModule],
  templateUrl: './user-token-extend-form.html'
})
export class UserTokenExtendForm {

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

}
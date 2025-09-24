import { CommonModule } from '@angular/common';
import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'access-user-token-extend-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FloatLabelModule, DatePickerModule, ButtonModule],
  templateUrl: './user-token-extend-form.html'
})
export class UserTokenExtendForm {

  @Input() public set expirationDate(value: Date) {
    this.form.get('expirationDate')?.setValue(value);
  }

  public readonly form;
  
  public readonly save = output<Date>();

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      expirationDate: [new Date(), Validators.required]
    });
  }
  
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value.expirationDate as Date);
    }
  }

}
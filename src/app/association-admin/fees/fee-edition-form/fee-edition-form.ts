
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fee } from '@app/domain/fees/fee';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-edition-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, SaveControlsComponent],
  templateUrl: './fee-edition-form.html'
})
export class FeeEditionForm extends FormComponent<Fee> {

  @Input() public override set data(value: Fee) {
    super.loadData(value);
    this.fee = value;
  }

  public fee = new Fee();

  constructor() {
    super();

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

}
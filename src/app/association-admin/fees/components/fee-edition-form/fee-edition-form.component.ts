
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fee } from '@app/domain/fees/fee';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-edition-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, SaveControlsComponent, IconSuccessOrFailureComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './fee-edition-form.component.html'
})
export class FeeEditionFormComponent extends FormComponent<Fee> {

  @Input() public override set data(value: Fee) {
    super.loadData(value);
    this.fee = value;
  }

  public fee = new Fee();

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      person: fb.group({
        number: [null, Validators.required]
      }),
      month: ['', Validators.required],
      payment: fb.group({
        index: [null],
        date: ['', Validators.required]
      })
    });
  }

}
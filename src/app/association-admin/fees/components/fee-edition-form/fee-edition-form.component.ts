
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { Fee } from '../../../../models/fees/fee';

@Component({
  selector: 'assoc-fee-edition-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, IconSuccessOrFailureComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './fee-edition-form.component.html'
})
export class FeeEditionFormComponent extends FormComponent<Fee> {

  @Input() public override set data(value: Fee) {
    super.loadData(value);
    this.fee = value;
  }

  public fee = new Fee();

  constructor() {
    const fb = inject(FormBuilder);

    super();

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
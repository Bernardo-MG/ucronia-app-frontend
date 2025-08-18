
import { Component, Input, inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { Person } from '@app/domain/person/person';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective, WaitingDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-fee-pay-form',
  imports: [FormsModule, ReactiveFormsModule, IconAddComponent, IconDeleteComponent, JustifyCenterDirective, InputFailureFeedbackComponent, WaitingDirective, InvalidFieldDirective],
  templateUrl: './fee-pay-form.component.html'
})
export class FeePayFormComponent extends FormComponent<FeePayment> {
  private fb = inject(FormBuilder);


  @Input() public set person(value: Person) {
    this.form.get('person')?.get('number')?.setValue(value.number);
    this.fullname = value.name.fullName;
  }

  public fullname = "";

  constructor() {
    super();
    const fb = this.fb;


    this.form = fb.group({
      payment: fb.group({
        date: [null, Validators.required]
      }),
      person: fb.group({
        number: [null, Validators.required]
      }),
      feeMonths: fb.array([''], Validators.required)
    });
  }

  public addDate() {
    const dates = this.form.get('feeMonths') as FormArray;
    dates.push(this.fb.control(''));
  }

  public removeDate(index: number): void {
    const feeMonthsArray = this.form.get('feeMonths') as FormArray;
    feeMonthsArray.removeAt(index);
  }

}

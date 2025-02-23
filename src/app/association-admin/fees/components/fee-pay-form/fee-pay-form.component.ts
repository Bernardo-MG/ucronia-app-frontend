import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeePayment } from '@app/models/fees/fee-payment';
import { Person } from '@app/models/person/person';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective, WaitingButtonComponent } from '@bernardo-mg/layout';

@Component({
    selector: 'assoc-fee-pay-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent, IconAddComponent, IconDeleteComponent, JustifyCenterDirective, InputFailureFeedbackComponent, InvalidFieldDirective],
    templateUrl: './fee-pay-form.component.html'
})
export class FeePayFormComponent extends FormComponent<FeePayment> {

  @Input() public set person(value: Person) {
    this.form.get('person')?.get('number')?.setValue(value.number);
    this.fullname = value.name.fullName;
  }

  public fullname = "";

  constructor(
    private fb: FormBuilder
  ) {
    super();

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

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FeePayment } from '@app/models/fees/fee-payment';
import { Member } from '@app/models/members/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'assoc-fee-pay-form',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, WaitingButtonComponent, JustifyCenterDirective],
  templateUrl: './fee-pay-form.component.html'
})
export class FeePayFormComponent extends FormComponent<FeePayment> {

  @Input() public set member(value: Member) {
    this.form.get('member')?.get('number')?.setValue(value.number);
    this.fullname = value.name.fullName;
  }

  public fullname = "";

  constructor(
    private fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      transaction: fb.group({
        date: [null, Validators.required]
      }),
      member: fb.group({
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

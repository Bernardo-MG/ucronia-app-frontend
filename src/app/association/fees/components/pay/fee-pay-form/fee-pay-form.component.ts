import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { Member } from '../../../../members/models/member';
import { FeePayment } from '../../../models/fee-payment';

@Component({
  selector: 'assoc-fee-pay-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule, WaitingButtonComponent],
  templateUrl: './fee-pay-form.component.html'
})
export class FeePayFormComponent extends FormComponent<FeePayment> implements OnChanges {

  @Input() public member = new Member();

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
      feeDates: fb.array([], Validators.required)
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['member']) {
      this.form.get('member')?.get('number')?.setValue(this.member.number);
    }
  }

  public addDate() {
    const dates = this.form.get('feeDates') as FormArray;
    dates.push(this.fb.control(''));
  }

  public removeDate(index: number): void {
    const feeDatesArray = this.form.get('feeDates') as FormArray;
    feeDatesArray.removeAt(index);
  }

}

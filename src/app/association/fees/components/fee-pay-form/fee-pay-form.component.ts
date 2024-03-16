import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Member } from '../../../members/models/member';
import { FeePayment } from '../../models/fee-payment';

@Component({
  selector: 'assoc-fee-pay-form',
  templateUrl: './fee-pay-form.component.html'
})
export class FeePayFormComponent extends FormComponent<FeePayment> {

  @Input() public member = new Member();

  public addIcon = faAdd;

  public removeIcon = faTrash;

  constructor(
    private fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      transaction: fb.group({
        date: [null, Validators.required]
      }),
      feeDates: fb.array([], Validators.required)
    });
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

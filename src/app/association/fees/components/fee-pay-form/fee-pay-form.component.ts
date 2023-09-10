import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Member } from '@app/association/models/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { faAdd, faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FeePayment } from '../../models/fee-payment';

@Component({
  selector: 'assoc-fee-pay-form',
  templateUrl: './fee-pay-form.component.html'
})
export class FeePayFormComponent extends FormComponent<FeePayment> implements OnChanges {

  @Input() public memberId = -1;
  
  @Input() public memberName = '';

  public member = new Member();

  public searchIcon = faMagnifyingGlass;

  public addIcon = faAdd;

  public removeIcon = faTrash;

  constructor(
    private fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      id: [-1],
      memberId: [null, [Validators.required, Validators.min(0)]],
      paymentDate: [null, Validators.required],
      feeDates: fb.array([], Validators.required),
      description: ['', Validators.required]
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['memberId']) {
      this.data = { ...this.data, memberId: this.memberId };
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

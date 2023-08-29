import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'assoc-fee-pay-form',
  templateUrl: './fee-pay-form.component.html'
})
export class FeePayFormComponent extends FormComponent<Fee> implements OnChanges {

  @Input() public memberId = -1;
  
  @Input() public memberName = '';

  @Output() public selectMember = new EventEmitter<void>();

  public member = new Member();

  public searchIcon = faMagnifyingGlass;

  constructor(
    private fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      id: [-1],
      memberId: [null, [Validators.required, Validators.min(0)]],
      paymentDate: [null, Validators.required],
      feeDates: fb.array([], Validators.required),
      amount: [0, Validators.required],
      description: ['', Validators.required]
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['memberId']) {
      this.data = { ...this.data, memberId: this.memberId };
    }
  }

  public onStartSelectingMember() {
    this.selectMember.emit();
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

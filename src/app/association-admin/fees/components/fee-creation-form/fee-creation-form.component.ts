import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Fee } from '@app/models/fees/fee';
import { Member } from '@app/models/members/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'assoc-fee-creation-form',
  standalone: true,
  imports: [CommonModule, FormModule, WaitingButtonComponent],
  templateUrl: './fee-creation-form.component.html'
})
export class FeeCreationFormComponent extends FormComponent<Fee> {

  @Input() public set member(value: Member) {
    this.form.get('member')?.get('number')?.setValue(value.number);
  }

  constructor(
    private fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      member: fb.group({
        number: [null, Validators.required]
      }),
      month: ['', Validators.required]
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

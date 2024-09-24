import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Member } from '@app/association-admin/members/shared/models/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { FeePayment } from '../../../shared/models/fee-payment';

@Component({
  selector: 'assoc-fee-pay-form',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, WaitingButtonComponent, JustifyCenterDirective],
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

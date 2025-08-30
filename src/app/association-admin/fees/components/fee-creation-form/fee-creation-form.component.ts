
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fee } from '@app/domain/fees/fee';
import { Member } from '@app/domain/members/member';
import { FormComponent } from '@bernardo-mg/form';
import { WaitingDirective } from '@bernardo-mg/ui';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-creation-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, WaitingDirective],
  templateUrl: './fee-creation-form.component.html'
})
export class FeeCreationFormComponent extends FormComponent<Fee> {

  @Input() public set member(value: Member) {
    this.form.get('member')?.setValue(value.number);
    this.memberName = value.name.fullName;
  }

  public memberName = "";

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      member: [null, Validators.required],
      month: ['', Validators.required]
    });
  }

  public onMonthSelect(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    let dateValue;
    if (month < 10) {
      dateValue = `${year}-0${month}`;
    } else {
      dateValue = `${year}-${month}`;
    }

    this.form.get('month')?.setValue(dateValue, { emitEvent: false });
  }

}

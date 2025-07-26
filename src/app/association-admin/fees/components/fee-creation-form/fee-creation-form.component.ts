import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fee } from '@app/models/fees/fee';
import { Member } from '@app/models/members/member';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective } from '@bernardo-mg/form';
import { WaitingDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-fee-creation-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputFailureFeedbackComponent, WaitingDirective, InvalidFieldDirective],
  templateUrl: './fee-creation-form.component.html'
})
export class FeeCreationFormComponent extends FormComponent<Fee> {

  @Input() public set person(value: Member) {
    this.form.get('person')?.get('number')?.setValue(value.number);
    this.fullname = value.name.fullName;
  }

  public fullname = "";

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      person: fb.group({
        number: [null, Validators.required]
      }),
      month: ['', Validators.required]
    });
  }

}

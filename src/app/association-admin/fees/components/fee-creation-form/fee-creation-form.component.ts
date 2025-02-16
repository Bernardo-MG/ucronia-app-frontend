import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fee } from '@app/models/fees/fee';
import { Member } from '@app/models/members/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { InputFailureFeedbackComponent } from '@app/shared/form/components/input-failure-feedback/input-failure-feedback.component';
import { InvalidFieldDirective } from '@app/shared/form/directives/invalid-field.directive';
import { WaitingButtonComponent } from '@bernardo-mg/layout';

@Component({
    selector: 'assoc-fee-creation-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
    templateUrl: './fee-creation-form.component.html'
})
export class FeeCreationFormComponent extends FormComponent<Fee> {

  @Input() public set person(value: Member) {
    this.form.get('person')?.get('number')?.setValue(value.number);
    this.fullname = value.name.fullName;
  }

  public fullname = "";

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      person: fb.group({
        number: [null, Validators.required]
      }),
      month: ['', Validators.required]
    });
  }

}

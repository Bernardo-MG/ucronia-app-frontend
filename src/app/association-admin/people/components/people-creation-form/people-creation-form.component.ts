import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Membership } from '@app/models/person/membership';
import { Person } from '@app/models/person/person';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { InputFailureFeedbackComponent } from '@app/shared/form/components/input-failure-feedback/input-failure-feedback.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { InvalidFieldDirective } from '@app/shared/form/directives/invalid-field.directive';

@Component({
    selector: 'assoc-people-creation-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
    templateUrl: './people-creation-form.component.html'
})
export class PeopleCreationFormComponent extends FormComponent<Person> {

  public get member() {
    return !!((this.data) && (this.data.membership));
  }

  constructor(
    fb: FormBuilder
  ) {
    super();

    const membership = new Membership();
    membership.active = true;
    membership.renew = true;
    this.form = fb.group({
      name: fb.group({
        firstName: [null],
        lastName: ['']
      }),
      membership: membership
    });
  }

  onChangeMemberStatus(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if ((this.data) && (this.data.membership)) {
      if (checkbox.checked) {
        this.data.membership.active = true;
        this.data.membership.renew = true;
      } else if (this.data) {
        this.data.membership.active = false;
        this.data.membership.renew = false;
      }
    }
  }

}

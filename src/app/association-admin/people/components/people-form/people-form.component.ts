import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Membership } from '@app/models/person/membership';
import { Person } from '@app/models/person/person';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';

@Component({
  selector: 'assoc-people-form',
  standalone: true,
  imports: [CommonModule, FormModule, SaveControlsComponent],
  templateUrl: './people-form.component.html'
})
export class PeopleFormComponent extends FormComponent<Person> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    const membership = new Membership();
    membership.active = true;
    this.form = fb.group({
      name: fb.group({
        firstName: [null],
        lastName: ['']
      }),
      identifier: [''],
      phone: [''],
      membership: membership
    });
  }

  onChangeMemberStatus(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if ((this.data) && (this.data.membership)) {
      if (checkbox.checked) {
        this.data.membership.active = true;
      } else if (this.data) {
        this.data.membership = undefined;
      }
    }
  }

}

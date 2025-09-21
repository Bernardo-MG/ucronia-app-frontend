
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Person } from '@app/domain/person/person';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';

@Component({
  selector: 'assoc-people-edition-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './people-edition-form.html'
})
export class PeopleEditionForm extends FormComponent<Person> {

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      number: [-1],
      name: fb.group({
        firstName: [null],
        lastName: ['']
      }),
      identifier: [''],
      birthDate: [''],
      phone: [''],
      membership: fb.group({
        active: [false],
        renew: [false]
      })
    });
  }

}

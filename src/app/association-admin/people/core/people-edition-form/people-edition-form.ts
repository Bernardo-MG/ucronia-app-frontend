
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Person } from '@app/domain/person/person';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-people-edition-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, SaveControlsComponent],
  templateUrl: './people-edition-form.html'
})
export class PeopleEditionForm extends FormComponent<Person> {

  constructor() {
    super();

    const fb = inject(FormBuilder);

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

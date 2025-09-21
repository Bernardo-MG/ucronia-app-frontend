
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Person } from '@app/domain/person/person';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'assoc-people-creation-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule, ToggleSwitchModule, SaveControlsComponent],
  templateUrl: './people-creation-form.html'
})
export class PeopleCreationForm extends FormComponent<Person> {

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      name: fb.group({
        firstName: [null],
        lastName: ['']
      }),
      membership: fb.group({
        active: [false]
      })
    });
  }

  public onChangeMemberStatus(event: ToggleSwitchChangeEvent) {
    if (event.checked) {
      this.form.get('membership')?.get('active')?.setValue(true);
    } else {
      this.form.get('membership')?.get('active')?.setValue(false);
    }
  }

}

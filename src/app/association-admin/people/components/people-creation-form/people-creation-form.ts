
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Membership } from '@app/domain/person/membership';
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

  public get member() {
    return !!((this.data) && (this.data.membership));
  }

  public set membership(data: Membership | undefined) {
    this.form.get('membership')?.setValue(data);
  }

  constructor() {
    const fb = inject(FormBuilder);

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

  public onChangeMemberStatus(event: ToggleSwitchChangeEvent) {
    if (this.data) {
      if (event.checked) {
        if (!this.data.membership) {
          this.data.membership = new Membership();
        }
        this.data.membership.active = true;
        this.data.membership.renew = true;
      } else if (this.data) {
        this.data.membership = undefined;
        this.membership = undefined;
      }
    }
  }

}

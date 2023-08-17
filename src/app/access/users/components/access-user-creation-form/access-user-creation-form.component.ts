import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@app/core/authentication/models/user';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'access-user-creation-form',
  templateUrl: './access-user-creation-form.component.html'
})
export class AccessUserCreationFormComponent extends FormComponent<User> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

}

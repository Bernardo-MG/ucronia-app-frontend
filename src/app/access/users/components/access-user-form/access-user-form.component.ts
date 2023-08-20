import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@app/core/authentication/models/user';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'access-user-form',
  templateUrl: './access-user-form.component.html'
})
export class AccessUserFormComponent extends FormComponent<User> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      id: [null],
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      credentialsExpired: [true, Validators.required],
      enabled: [true, Validators.required],
      expired: [true, Validators.required],
      locked: [true, Validators.required]
    });
  }

}

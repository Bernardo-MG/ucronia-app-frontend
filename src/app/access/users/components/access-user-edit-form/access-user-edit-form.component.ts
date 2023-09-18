import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@app/core/authentication/models/user';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'access-user-edit-form',
  templateUrl: './access-user-edit-form.component.html'
})
export class AccessUserEditFormComponent extends FormComponent<User> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      id: [null],
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordExpired: [true, Validators.required],
      enabled: [true, Validators.required],
      expired: [true, Validators.required],
      locked: [true, Validators.required]
    });
  }

}

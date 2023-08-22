import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@app/core/authentication/models/user';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'access-user-edition-form',
  templateUrl: './access-user-edition-form.component.html'
})
export class AccessUserEditionFormComponent extends FormComponent<User> {

  @Input() public username = '';

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      credentialsExpired: [true, Validators.required],
      enabled: [true, Validators.required],
      expired: [true, Validators.required],
      locked: [true, Validators.required]
    });
  }

}

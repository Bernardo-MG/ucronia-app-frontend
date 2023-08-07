import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Role } from '@app/core/authentication/models/role';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'access-role-form',
  templateUrl: './access-role-form.component.html'
})
export class AccessRoleFormComponent extends FormComponent<Role> {

  constructor(
    fb: FormBuilder
  ) {
    super(fb.group({
      id: [null],
      name: ['', Validators.required]
    }));
  }

}

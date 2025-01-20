import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Role } from '@app/core/authentication/models/role';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';

@Component({
    selector: 'access-role-form',
    imports: [CommonModule, FormModule, SaveControlsComponent],
    templateUrl: './access-role-form.component.html'
})
export class AccessRoleFormComponent extends FormComponent<Role> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['', Validators.required]
    });
  }

}

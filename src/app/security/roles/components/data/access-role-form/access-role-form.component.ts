import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '@app/core/authentication/models/role';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'access-role-form',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule, WaitingButtonComponent],
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

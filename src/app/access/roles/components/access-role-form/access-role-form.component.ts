import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '@app/core/authentication/models/role';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { LayoutModule } from '@app/shared/layout/layout.module';

@Component({
  selector: 'access-role-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LayoutModule],
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

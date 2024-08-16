import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@app/core/authentication/models/user';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'access-user-form',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule, WaitingButtonComponent],
  templateUrl: './access-user-form.component.html'
})
export class AccessUserFormComponent extends FormComponent<User> {

  @Input() public create = true;

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

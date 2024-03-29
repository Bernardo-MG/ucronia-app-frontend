import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@app/core/authentication/models/user';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'access-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent],
  templateUrl: './access-user-form.component.html'
})
export class AccessUserFormComponent extends FormComponent<User> {

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

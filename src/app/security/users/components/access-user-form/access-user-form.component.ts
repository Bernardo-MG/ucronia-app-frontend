
import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@bernardo-mg/authentication';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';

@Component({
  selector: 'access-user-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './access-user-form.component.html'
})
export class AccessUserFormComponent extends FormComponent<User> {

  public readonly create = input(true);

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

}

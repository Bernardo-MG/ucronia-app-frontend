import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { PasswordResetRequest } from '../../models/password-reset-request';

@Component({
  selector: 'login-password-reset-request-form',
  templateUrl: './password-reset-request-form.component.html'
})
export class PasswordResetRequestFormComponent extends FormComponent<PasswordResetRequest> {

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();

    this.form = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

}

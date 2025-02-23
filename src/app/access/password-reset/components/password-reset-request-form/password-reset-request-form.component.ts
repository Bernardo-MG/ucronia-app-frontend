import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective } from '@bernardo-mg/form';
import { WaitingButtonComponent } from '@bernardo-mg/layout';
import { PasswordResetRequest } from '../../models/password-reset-request';

/**
 * Password reset request form component. Dumb component for just handling the form.
 */
@Component({
    selector: 'login-password-reset-request-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
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

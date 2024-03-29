import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PasswordResetRequest } from '../../models/password-reset-request';

/**
 * Password reset request form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule],
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

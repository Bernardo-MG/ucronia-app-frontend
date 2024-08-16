import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PasswordResetRequest } from '../../models/password-reset-request';

/**
 * Password reset request form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-request-form',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule, IconsModule],
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

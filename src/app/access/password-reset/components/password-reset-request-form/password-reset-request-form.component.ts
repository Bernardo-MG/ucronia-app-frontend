
import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordResetRequest } from '../../models/password-reset-request';

/**
 * Password reset request form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-request-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule],
  templateUrl: './password-reset-request-form.component.html'
})
export class PasswordResetRequestFormComponent {

  public readonly save = output<PasswordResetRequest>();

  public form: any;

  constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

}

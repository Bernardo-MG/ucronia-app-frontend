
import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

/**
 * Password reset request form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-request-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule],
  templateUrl: './password-reset-request-form.html'
})
export class PasswordResetRequestForm {

  public readonly save = output<string>();

  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value.email);
    }
  }

}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordResetForm } from '@app/login/models/password-reset';

@Component({
  selector: 'login-password-reset-request-form',
  templateUrl: './password-reset-request-form.component.html'
})
export class PasswordResetRequestFormComponent {

  /**
   * Form structure.
   */
  public form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  @Output() public passwordReset = new EventEmitter<PasswordResetForm>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public onResetEmail() {
    if (this.form.valid) {
      // Valid form, can send data
      const form = new PasswordResetForm();
      if (this.form.value.email) {
        form.email = this.form.value.email;
      }

      this.passwordReset.emit(form);
    }
  }

  /**
   * Checks if the form field is invalid.
   * 
   * @param field field to check
   * @returns true if the form is invalid, false otherwise
   */
  public isInvalid(field: string): boolean {
    let invalid: boolean;

    if (this.form.invalid) {
      const formField = this.form.get(field);
      if (formField) {
        invalid = (formField?.dirty || formField?.touched) && (formField?.errors != null);
      } else {
        invalid = false;
      }
    } else {
      invalid = false;
    }

    return invalid;
  }

}
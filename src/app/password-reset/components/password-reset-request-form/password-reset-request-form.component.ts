import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordReset } from '@app/password-reset/models/password-reset';
import { PasswordResetRequest } from '@app/password-reset/models/password-reset-request';

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

  @Output() public passwordReset = new EventEmitter<PasswordResetRequest>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public onResetEmail() {
    if (this.form.valid) {
      // Valid form, can send data
      const form = new PasswordResetRequest();
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
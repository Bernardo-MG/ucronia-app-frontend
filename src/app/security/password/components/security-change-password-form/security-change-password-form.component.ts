import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChangePasswordForm } from '../../model/change-password-form';

@Component({
  selector: 'security-change-password-form',
  templateUrl: './security-change-password-form.component.html',
  styleUrls: ['./security-change-password-form.component.sass']
})
export class SecurityChangePasswordFormComponent {

  @Output() public changePassword = new EventEmitter<ChangePasswordForm>();

  public form = this.formBuilder.nonNullable.group({
    password: ['', Validators.required],
    passwordRepeat: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public onLogin() {
    if (this.form.valid) {
      // Valid form, can send data
      const user = new ChangePasswordForm();
      if ((this.form.value.password)
        && ((this.form.value.passwordRepeat)
          && ((this.form.value.password === this.form.value.passwordRepeat)))) {
        user.password = this.form.value.password;
      }

      this.changePassword.emit(user);
    }
  }

  /**
   * Checks if the form field is invalid.
   * 
   * @param field field to check
   * @returns true if the form is invalid, false otherwise
   */
  public isFieldInvalid(field: string): boolean {
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

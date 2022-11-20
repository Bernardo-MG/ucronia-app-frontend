import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChange } from '@app/account/models/password-change';

@Component({
  selector: 'account-change-password-form',
  templateUrl: './account-change-password-form.component.html',
  styleUrls: ['./account-change-password-form.component.sass']
})
export class AccountChangePasswordFormComponent {

  @Output() public changePassword = new EventEmitter<PasswordChange>();

  public form: FormGroup = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    passwordRepeat: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  public onSave() {
    this.changePassword.emit(this.form.value);
  }

  public isFormInvalid(): boolean {
    let invalid;

    if (this.form.invalid) {
      invalid = true;
    } else {
      invalid = (this.form.value.newPassword !== this.form.value.passwordRepeat);
    }

    return invalid;
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

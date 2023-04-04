import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordChange } from '@app/account/models/password-change';

@Component({
  selector: 'account-change-password-form',
  templateUrl: './account-change-password-form.component.html',
  styleUrls: ['./account-change-password-form.component.sass']
})
export class AccountChangePasswordFormComponent {

  /**
   * Loading flag. Shows the loading visual cue and disables the form.
   */
  @Input() public saving = false;

  @Output() public changePassword = new EventEmitter<PasswordChange>();

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('passwordRepeat')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  public form: FormGroup = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    passwordRepeat: ['', Validators.required]
  },
    { validators: this.checkPasswords });

  constructor(
    private fb: FormBuilder
  ) { }

  public onSave() {
    this.changePassword.emit(this.form.value);
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

  public isSaveEnabled(): boolean {
    return ((this.form.valid) && (!this.saving));
  }

}

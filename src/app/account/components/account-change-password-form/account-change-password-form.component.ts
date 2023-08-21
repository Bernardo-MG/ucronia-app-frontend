import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordChange } from '@app/account/models/password-change';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'account-change-password-form',
  templateUrl: './account-change-password-form.component.html'
})
export class AccountChangePasswordFormComponent extends FormComponent<PasswordChange> {

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('passwordRepeat')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(
    private fb: FormBuilder
  ) {
    super();

    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    },
      { validators: this.checkPasswords });
  }

}

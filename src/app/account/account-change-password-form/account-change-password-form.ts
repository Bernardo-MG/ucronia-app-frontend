
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordChange } from '@app/account/models/password-change';
import { FormComponent } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'account-change-password-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, MessageModule],
  templateUrl: './account-change-password-form.html'
})
export class AccountChangePasswordForm extends FormComponent<PasswordChange> {

  private fb = inject(FormBuilder);

  private checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('passwordRepeat')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  constructor() {
    super();

    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    },
      {
        validators: this.checkPasswords
      });
  }

}

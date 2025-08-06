
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordChange } from '@app/account/models/password-change';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective } from '@bernardo-mg/form';
import { WaitingDirective } from '@bernardo-mg/ui';

@Component({
    selector: 'account-change-password-form',
    imports: [FormsModule, ReactiveFormsModule, InputFailureFeedbackComponent, WaitingDirective, InvalidFieldDirective],
    templateUrl: './account-change-password-form.component.html'
})
export class AccountChangePasswordFormComponent extends FormComponent<PasswordChange> {
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
      { validators: this.checkPasswords });
  }

}

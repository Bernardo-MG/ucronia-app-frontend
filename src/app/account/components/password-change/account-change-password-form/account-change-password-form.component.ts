import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordChange } from '@app/account/models/password-change';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { InputFailureFeedbackComponent } from '@app/shared/form/components/input-failure-feedback/input-failure-feedback.component';
import { InvalidFieldDirective } from '@app/shared/form/directives/invalid-field.directive';
import { WaitingButtonComponent } from '@bernardo-mg/layout';

@Component({
    selector: 'account-change-password-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
    templateUrl: './account-change-password-form.component.html'
})
export class AccountChangePasswordFormComponent extends FormComponent<PasswordChange> {

  private checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
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

import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { FormComponent } from '@app/shared/form/components/form/form.component';

@Component({
  selector: 'login-password-reset-form',
  templateUrl: './password-reset-form.component.html'
})
export class PasswordResetFormComponent extends FormComponent<ConfirmPassword> {

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();

    this.form = this.formBuilder.nonNullable.group({
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.passwordsMatch()]]
    });
  }

  private passwordsMatch(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.parent) {

        const password: any = c.parent.get('password');
        const confirmPassword: any = c.parent.get('confirmPassword');

        return password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
      }
      return null;
    };
  }

}


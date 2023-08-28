import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
      confirmPassword: ['', [Validators.required]]
    });
  }

  public override isSaveDisabled() {
    return super.isSaveDisabled() || !this.isPasswordsMatching();
  }

  public isPasswordsMatching(): boolean {
    const password = this.form.get('password');
    const confirmPassword = this.form.get('confirmPassword');

    let matching;
    if (password && confirmPassword) {
      matching = password.getRawValue() === confirmPassword.getRawValue();
    } else {
      matching = false;
    }

    return matching;
  }

}


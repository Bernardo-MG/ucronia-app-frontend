import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { FormComponent } from '@app/shared/form/components/form/form.component';

/**
 * User activation form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'access-user-activation-form',
  templateUrl: './user-activation-form.component.html'
})
export class UserActivationFormComponent extends FormComponent<ConfirmPassword> {

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

  /**
   * Indicates if the password mismatch warning should be shown.
   * 
   * @returns true if the password mismatch warning should be shown, false otherwise
   */
  public showPasswordMismatchWarning(): boolean {
    const password = this.form.get('password');
    const confirmPassword = this.form.get('confirmPassword');

    let show;
    if (password.getRawValue().length && confirmPassword.getRawValue().length) {
      show = !this.isPasswordsMatching();
    } else {
      show = false;
    }

    return show;
  }

  /**
   * Indicates if the passwords match.
   * 
   * @returns true if the passwords match, false otherwise
   */
  private isPasswordsMatching(): boolean {
    const password = this.form.get('password');
    const confirmPassword = this.form.get('confirmPassword');

    return (password.getRawValue() === confirmPassword.getRawValue());
  }

}

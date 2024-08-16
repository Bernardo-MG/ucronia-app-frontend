import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';

/**
 * Password reset form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-form',
  standalone: true,
  imports: [CommonModule, FormModule, ReactiveFormsModule, IconsModule],
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

  public override get saveEnabled() {
    return super.saveEnabled && this.isPasswordsMatching();
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
    const password = this.form.get('password').getRawValue();
    const confirmPassword = this.form.get('confirmPassword').getRawValue();

    return (password === confirmPassword) && (password.length > 0);
  }

}


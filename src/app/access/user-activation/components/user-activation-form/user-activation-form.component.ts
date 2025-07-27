import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { FormComponent } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

/**
 * User activation form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'access-user-activation-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule, ButtonModule],
  templateUrl: './user-activation-form.component.html'
})
export class UserActivationFormComponent extends FormComponent<ConfirmPassword> {

  private formBuilder = inject(FormBuilder);

  private passwordsMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null; // skip until both fields are filled
    }

    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  constructor() {
    super();

    this.form = this.formBuilder.nonNullable.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: this.passwordsMatchValidator
      }
    );
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
   * Indicates if the passwords match. If both are empty they are considered to not be matching.
   * 
   * @returns true if the passwords match, false otherwise
   */
  private isPasswordsMatching(): boolean {
    const password = this.form.get('password').getRawValue();
    const confirmPassword = this.form.get('confirmPassword').getRawValue();

    return (password.length > 0) && (password === confirmPassword);
  }

}

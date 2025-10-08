
import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { confirmPasswordValidator, FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

/**
 * Password reset form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'login-password-reset-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, ButtonModule, MessageModule],
  templateUrl: './password-reset-form.html'
})
export class PasswordResetForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  public readonly save = output<ConfirmPassword>();

  public formStatus: FormStatus;

  public form: FormGroup;

  constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: confirmPasswordValidator
      }
    );

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
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
    if (password?.getRawValue().length && confirmPassword?.getRawValue().length) {
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
  isPasswordsMatching(): boolean {
    const password = this.form.get('password')?.getRawValue();
    const confirmPassword = this.form.get('confirmPassword')?.getRawValue();

    return (password.length > 0) && (password === confirmPassword);
  }

}


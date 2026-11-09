import { Component, inject, input, output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator, FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

/**
 * User activation form component. Dumb component for just handling the form.
 */
@Component({
  selector: 'access-user-activation-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, MessageModule, ButtonModule],
  templateUrl: './user-activation-form.component.html'
})
export class UserActivationForm {

  public readonly failures = input(new FailureStore());
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly save = output<string>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;

  protected get saveEnabled(): boolean {
    return this.formStatus.saveEnabled && this.isPasswordsMatching();
  }

  public constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.nonNullable.group(
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

  // Event handlers
  protected onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      // Valid form, can emit data
      this.save.emit(this.form.value.password);
    }
  }

  // Protected methods
  protected isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

  /**
   * Indicates if the password mismatch warning should be shown.
   *
   * @returns true if the password mismatch warning should be shown, false otherwise
   */
  protected showPasswordMismatchWarning(): boolean {
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

  // Private methods
  /**
   * Indicates if the passwords match. If both are empty they are considered to not be matching.
   *
   * @returns true if the passwords match, false otherwise
   */
  private isPasswordsMatching(): boolean {
    const password = this.form.get('password')?.getRawValue();
    const confirmPassword = this.form.get('confirmPassword')?.getRawValue();

    return (password.length > 0) && (password === confirmPassword);
  }

}

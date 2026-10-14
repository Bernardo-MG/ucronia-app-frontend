import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';

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
  imports: [DrawerFormActions, FormsModule, ReactiveFormsModule, InputTextModule, MessageModule, ButtonModule],
  templateUrl: './user-activation-form.component.html'
})
export class UserActivationForm {

  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly failures = input(new FailureStore());

  public readonly save = output<string>();

  public readonly formStatus: FormStatus;

  public readonly form: FormGroup;

  public get saveEnabled() {
    return this.formStatus.saveEnabled && this.isPasswordsMatching();
  }

  constructor() {
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
  private isPasswordsMatching(): boolean {
    const password = this.form.get('password')?.getRawValue();
    const confirmPassword = this.form.get('confirmPassword')?.getRawValue();

    return (password.length > 0) && (password === confirmPassword);
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      // Valid form, can emit data
      this.save.emit(this.form.value.password);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}

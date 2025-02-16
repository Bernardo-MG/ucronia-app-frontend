import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmPassword } from '@app/access/models/confirm-password';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { InputFailureFeedbackComponent } from '@app/shared/form/components/input-failure-feedback/input-failure-feedback.component';
import { InvalidFieldDirective } from '@app/shared/form/directives/invalid-field.directive';
import { WaitingButtonComponent } from '@bernardo-mg/layout';

/**
 * User activation form component. Dumb component for just handling the form.
 */
@Component({
    selector: 'access-user-activation-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
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

    return (password === confirmPassword) && (password.length > 0);
  }

}

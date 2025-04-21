import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvalidFieldDirective } from '@bernardo-mg/form';
import { WaitingDirective } from '@bernardo-mg/layout';
import { UserLogin } from '../../models/user-login';

/**
 * Login form component. Dumb component for just handling the form.
 * 
 * Includes checkbox for the 'remember me' functionality.
 */
@Component({
  selector: 'login-login-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingDirective, InvalidFieldDirective],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  /**
   * Waiting flag. Shows the waiting visual cue and disables the form.
   */
  private _waiting = false;

  @Input() public set waiting(flag: boolean) {
    this._waiting = flag;
    if (this._waiting) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public get waiting() {
    return this._waiting;
  }

  /**
   * Failed login flag. Shows the failure warning.
   */
  @Input() public failedLogin = false;

  /**
   * Login event. Sent when the user accepts the data in the form.
   */
  @Output() public login = new EventEmitter<UserLogin>();

  /**
   * Remember me event. Sent when the user changes the remember me flag.
   */
  @Output() public rememberMe = new EventEmitter<boolean>();

  /**
   * Login enabled flag.
   */
  public get loginEnabled(): boolean {
    return ((this.form.valid) && (!this.waiting));
  }

  /**
   * Remember me enabled flag.
   */
  public get rememberMeEnabled(): boolean {
    return (!this.waiting);
  }

  /**
   * Form structure.
   */
  public form;

  constructor(
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Handler for the login event.
   */
  public onLogin() {
    if (this.form.valid) {
      // Valid form, can send data
      const user = new UserLogin(this.form.value.username, this.form.value.password);
      this.login.emit(user);
    }
  }

  /**
   * Handler for the remember me event.
   * 
   * @param event checkbox selection param
   */
  public onRememberMe(event: any) {
    this.rememberMe.emit(event.checked);
  }

  /**
   * Checks if the form field is invalid.
   * 
   * @param property property to check
   * @returns true if the form is invalid, false otherwise
   */
  public isFieldInvalid(property: string): boolean {
    let invalid: boolean;

    if (this.form.invalid) {
      // Form invalid
      // So this field may be invalid

      const formField = this.form.get(property);
      if (formField) {
        // Check the field status
        invalid = (formField?.dirty || formField?.touched) && (formField?.errors != null);
      } else {
        // Invalid property
        // Can't be invalid
        invalid = false;
      }
    } else {
      // Form valid
      // No field is invalid
      invalid = false;
    }

    return invalid;
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginFormUser } from '../../model/login-form-user';

/**
 * Login form component. Dumb component for handling the form. Includes checkbox for the 'remember me' functionality.
 */
@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent {

  @Input() public loading = false;

  /**
   * Login event. Sent when the user accepts the data in the form.
   */
  @Output() public login = new EventEmitter<LoginFormUser>();

  /**
   * Remember me event. Sent when the user changes the remember me flag.
   */
  @Output() public rememberMe = new EventEmitter<boolean>();

  /**
   * Form structure.
   */
  public form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  /**
   * Handler for the login event.
   */
  public onLogin() {
    if (this.form.valid) {
      // Valid form, can send data
      const user = new LoginFormUser();
      if (this.form.value.username) {
        user.username = this.form.value.username;
      }
      if (this.form.value.password) {
        user.password = this.form.value.password;
      }

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
   * @param field field to check
   * @returns true if the form is invalid, false otherwise
   */
  public isFieldInvalid(field: string): boolean {
    let invalid: boolean;

    if (this.form.invalid) {
      const formField = this.form.get(field);
      if (formField) {
        invalid = (formField?.dirty || formField?.touched) && (formField?.errors != null);
      } else {
        invalid = false;
      }
    } else {
      invalid = false;
    }

    return invalid;
  }

  public isLoginEnabled(): boolean {
    return ((this.form.valid) && (!this.loading));
  }

}

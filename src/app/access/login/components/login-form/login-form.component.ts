import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { UserLogin } from '../../models/user-login';

/**
 * Login form component. Dumb component for just handling the form.
 * 
 * Includes checkbox for the 'remember me' functionality.
 */
@Component({
  selector: 'login-login-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, FloatLabelModule, ButtonModule, MessageModule],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  /**
   * loading flag. Shows the loading visual cue and disables the form.
   */
  private _loading = false;

  @Input() public set loading(flag: boolean) {
    this._loading = flag;
    if (this._loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public get loading() {
    return this._loading;
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
   * Lost password event. Sent when the user clicks on the lost password option.
   */
  @Output() public lostPassword = new EventEmitter<void>();

  /**
   * Login enabled flag.
   */
  public get loginEnabled(): boolean {
    return ((this.form.valid) && (!this.loading));
  }

  /**
   * Remember me enabled flag.
   */
  public get rememberMeEnabled(): boolean {
    return (!this.loading);
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

}

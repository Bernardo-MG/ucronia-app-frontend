import { FormStatus } from '@bernardo-mg/form';
import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

/**
 * Login form component. Includes checkbox for the 'remember me' functionality.
 */
@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule, CheckboxModule, InputTextModule, ButtonModule, MessageModule, IconFieldModule, InputIconModule],
  templateUrl: './login-form.html'
})
export class LoginForm {

  @Input()
  public failedLogin = false;

  @Input()
  public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly login = output<LoginEvent>();
  public readonly lostPassword = output<void>();
  public readonly rememberMe = output<boolean>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;

  public get loginEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  public passwordVisible = false;

  public constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formStatus = new FormStatus(this.form);
  }

  public onLogin(): void {
    if (!this.loginEnabled) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
      }
      return;
    }

    const { username, password } = this.form.getRawValue();

    this.login.emit(
      new LoginEvent(username, password)
    );
  }

  public onLostPassword(): void {
    if (!this.formStatus.loading) {
      this.lostPassword.emit();
    }
  }

  public onRememberMe(checked: boolean): void {
    if (!this.formStatus.loading) {
      this.rememberMe.emit(checked);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property);
  }

  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}

export class LoginEvent {
  public constructor(
    public username: string,
    public password: string
  ) { }
}

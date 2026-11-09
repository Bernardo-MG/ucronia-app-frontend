import { FormStatus } from '@bernardo-mg/form';
import { Component, inject, Input, input, output } from '@angular/core';
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

  public readonly failedLogin = input(false);

  // Keep the setter so form status updates synchronously with each input assignment.
  @Input()
  public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly login = output<LoginEvent>();
  public readonly lostPassword = output<void>();
  public readonly rememberMe = output<boolean>();

  public readonly form: FormGroup;
  public get loginEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  protected readonly formStatus: FormStatus;
  protected passwordVisible = false;

  public constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formStatus = new FormStatus(this.form);
  }

  // Event handlers
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

  protected onLostPassword(): void {
    if (!this.formStatus.loading) {
      this.lostPassword.emit();
    }
  }

  protected onRememberMe(checked: boolean): void {
    if (!this.formStatus.loading) {
      this.rememberMe.emit(checked);
    }
  }

  protected togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // Protected methods
  protected isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property);
  }

}

export class LoginEvent {
  public constructor(
    public username: string,
    public password: string
  ) { }
}

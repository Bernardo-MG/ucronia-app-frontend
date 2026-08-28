import { Component, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { PasswordChange } from '@bernardo-mg/security';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'account-change-password-form',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, MessageModule],
  templateUrl: './account-change-password-form.html'
})
export class AccountChangePasswordForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  public readonly save = output<PasswordChange>();

  public readonly form;

  public readonly formStatus: FormStatus;

  private readonly passwordsMatch: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const passwordRepeat = control.get('passwordRepeat')?.value;

    return newPassword === passwordRepeat
      ? null
      : { passwordsMismatch: true };
  };

  constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        passwordRepeat: ['', Validators.required]
      },
      {
        validators: this.passwordsMatch
      }
    );

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      this.formStatus.loading = this.loading();
    }
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || !this.formStatus.saveEnabled) {
      return;
    }

    const value = this.form.getRawValue();
    const change = new PasswordChange();

    change.oldPassword = value.oldPassword;
    change.newPassword = value.newPassword;

    this.save.emit(change);
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property)
      || this.failures().hasFailures(property);
  }

  public hasPasswordMismatch(): boolean {
    const passwordRepeat = this.form.controls.passwordRepeat;

    return passwordRepeat.touched
      && this.form.hasError('passwordsMismatch');
  }

}
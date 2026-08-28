import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PasswordChange } from '@bernardo-mg/security';

import { AccountChangePasswordForm } from './account-change-password-form';

describe('AccountChangePasswordForm', () => {
  let component: AccountChangePasswordForm;
  let fixture: ComponentFixture<AccountChangePasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AccountChangePasswordForm
      ],
      providers: [
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountChangePasswordForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require all fields', () => {
    expect(
      component.form.controls.oldPassword.hasError('required')
    ).toBeTrue();

    expect(
      component.form.controls.newPassword.hasError('required')
    ).toBeTrue();

    expect(
      component.form.controls.passwordRepeat.hasError('required')
    ).toBeTrue();
  });

  it('should disable the save button by default', () => {
    expect(getSubmitButton().disabled).toBeTrue();
  });

  it('should show required messages after submitting an empty form', async () => {
    component.onSave();
    fixture.detectChanges();
    await fixture.whenStable();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain(
      'La contraseña actual es obligatoria'
    );
    expect(content).toContain(
      'La nueva contraseña es obligatoria'
    );
    expect(content).toContain(
      'Debes confirmar la nueva contraseña'
    );
  });

  it('should mark all fields as touched after an invalid save', () => {
    component.onSave();

    expect(component.form.controls.oldPassword.touched).toBeTrue();
    expect(component.form.controls.newPassword.touched).toBeTrue();
    expect(component.form.controls.passwordRepeat.touched).toBeTrue();
  });

  it('should enable the save button when the form is valid and dirty', () => {
    fillValidForm();
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(getSubmitButton().disabled).toBeFalse();
  });

  it('should disable the save button when passwords do not match', () => {
    fillFormWithPasswordMismatch();
    fixture.detectChanges();

    expect(
      component.form.hasError('passwordsMismatch')
    ).toBeTrue();

    expect(getSubmitButton().disabled).toBeTrue();
  });

  it('should not show the mismatch before confirmation is touched', () => {
    fillFormWithPasswordMismatch();
    fixture.detectChanges();

    expect(component.hasPasswordMismatch()).toBeFalse();

    expect(fixture.nativeElement.textContent).not.toContain(
      'Las contraseñas no coinciden'
    );
  });

  it('should show the mismatch after confirmation is touched', async () => {
    fillFormWithPasswordMismatch();
    component.form.controls.passwordRepeat.markAsTouched();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.hasPasswordMismatch()).toBeTrue();

    expect(fixture.nativeElement.textContent).toContain(
      'Las contraseñas no coinciden'
    );
  });

  it('should emit a password change when the form is saved', () => {
    const emitSpy = spyOn(component.save, 'emit');

    fillValidForm();
    component.onSave();

    expect(emitSpy).toHaveBeenCalledTimes(1);

    const emittedValue = emitSpy.calls.mostRecent().args[0];

    expect(emittedValue).toEqual(jasmine.any(PasswordChange));
    expect(emittedValue.oldPassword).toBe('current-password');
    expect(emittedValue.newPassword).toBe('new-password');
  });

  it('should not include passwordRepeat in the emitted value', () => {
    const emitSpy = spyOn(component.save, 'emit');

    fillValidForm();
    component.onSave();

    const emittedValue = emitSpy.calls.mostRecent().args[0];

    expect(
      Object.prototype.hasOwnProperty.call(
        emittedValue,
        'passwordRepeat'
      )
    ).toBeFalse();
  });

  it('should not emit when the form is invalid', () => {
    const emitSpy = spyOn(component.save, 'emit');

    component.onSave();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should disable saving while loading', () => {
    fillValidForm();

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(component.formStatus.loading).toBeTrue();
    expect(component.formStatus.saveEnabled).toBeFalse();
    expect(getSubmitButton().disabled).toBeTrue();
  });

  it('should not emit while loading', () => {
    const emitSpy = spyOn(component.save, 'emit');

    fillValidForm();

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    component.onSave();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should allow saving after loading finishes', () => {
    fillValidForm();

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    expect(component.formStatus.loading).toBeFalse();
    expect(component.formStatus.saveEnabled).toBeTrue();
    expect(getSubmitButton().disabled).toBeFalse();
  });

  function fillValidForm(): void {
    component.form.setValue({
      oldPassword: 'current-password',
      newPassword: 'new-password',
      passwordRepeat: 'new-password'
    });

    component.form.markAsDirty();
  }

  function fillFormWithPasswordMismatch(): void {
    component.form.setValue({
      oldPassword: 'current-password',
      newPassword: 'new-password',
      passwordRepeat: 'different-password'
    });

    component.form.markAsDirty();
  }

  function getSubmitButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
  }

});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FailureStore } from '@bernardo-mg/request';
import { PasswordResetForm } from './password-reset-form';

describe('PasswordResetForm', () => {
  let component: PasswordResetForm;
  let fixture: ComponentFixture<PasswordResetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        PasswordResetForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordResetForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form status', () => {

    it('should have an invalid form by default', () => {
      expect(component.form.valid).toBeFalse();
    });

    it('should have a valid form when the passwords match and are not empty', () => {
      component.form.get('password')?.setValue('password');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      expect(component.form.valid).toBeTrue();
    });

    it('should have an invalid form when the passwords don\'t match', () => {
      component.form.get('password')?.setValue('abc');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      expect(component.form.valid).toBeFalse();
    });

    it('should have an invalid form when both passwords are empty', () => {
      component.form.get('password')?.setValue('');
      component.form.get('confirmPassword')?.setValue('');
      fixture.detectChanges();

      expect(component.form.valid).toBeFalse();
    });

    it('should have an invalid form when the first password is empty', () => {
      component.form.get('password')?.setValue('');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      expect(component.form.valid).toBeFalse();
    });

    it('should have an invalid form when the second password is empty', () => {
      component.form.get('password')?.setValue('password');
      component.form.get('confirmPassword')?.setValue('');
      fixture.detectChanges();

      expect(component.form.valid).toBeFalse();
    });

  });

  describe('enabled form button status', () => {

    it('should disable the submit button by default', () => {
      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toEqual(true);
    });

  });

  describe('enabled form button status on waiting', () => {

    it('should disable the form button when the form is valid but it is waiting', () => {
      component.form.get('password')?.setValue('password');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('form button');
      expect(button.hasAttribute('disabled')).toBeTrue();
    });

    it('should disable the form button when the form is invalid and waiting', () => {
      component.form.get('password')?.setValue('');
      component.form.get('confirmPassword')?.setValue('');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('form button');
      expect(button.hasAttribute('disabled')).toBeTrue();
    });

  });

  describe('enabled form button status on password match', () => {

    it('should enable the form button when the passwords match and are not empty', () => {
      component.form.get('password')?.setValue('password');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toEqual(false);
    });

    it('should disable the form button when the passwords don\'t match', () => {
      component.form.get('password')?.setValue('abc');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toEqual(true);
    });

    it('should disable the form button when both passwords are empty', () => {
      component.form.get('password')?.setValue('');
      component.form.get('confirmPassword')?.setValue('');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toEqual(true);
    });

    it('should disable the form button when the first password is empty', () => {
      component.form.get('password')?.setValue('');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toEqual(true);
    });

    it('should disable the form button when the second password is empty', () => {
      component.form.get('password')?.setValue('password');
      component.form.get('confirmPassword')?.setValue('');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toEqual(true);
    });

  });

  describe('password mismatch warning', () => {

    it('should hide the password mismatch warning by default', () => {
      const warning = fixture.debugElement.nativeElement.querySelector('#passwordMismatchWarning');

      expect(warning).toBeNull();
    });

    it('should hide the password mismatch warning when the passwords match', () => {
      const warning = fixture.debugElement.nativeElement.querySelector('#passwordMismatchWarning');

      expect(warning).toBeNull();
    });

    it('should show the password mismatch warning when the passwords do not match', () => {
      component.form.get('password')?.setValue('abc');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      const warning = fixture.debugElement.nativeElement.querySelector('#passwordMismatchWarning');

      expect(warning).not.toBeNull();
    });

    it('should hide the password mismatch warning when the first password is empty', () => {
      component.form.get('password')?.setValue('');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      const warning = fixture.debugElement.nativeElement.querySelector('#passwordMismatchWarning');

      expect(warning).toBeNull();
    });

    it('should hide the password mismatch warning when the second password is empty', () => {
      component.form.get('password')?.setValue('password');
      component.form.get('confirmPassword')?.setValue('');
      fixture.detectChanges();

      const warning = fixture.debugElement.nativeElement.querySelector('#passwordMismatchWarning');

      expect(warning).toBeNull();
    });

    it('should hide the password mismatch warning when both passwords are empty', () => {
      component.form.get('password')?.setValue('');
      component.form.get('confirmPassword')?.setValue('');
      fixture.detectChanges();

      const warning = fixture.debugElement.nativeElement.querySelector('#passwordMismatchWarning');

      expect(warning).toBeNull();
    });

  });

  describe('output', () => {

    it('should emit save when submitting a valid form', () => {
      spyOn(component.save, 'emit');

      component.form.get('password')?.setValue('password');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.save.emit).toHaveBeenCalledWith({ password: 'password', confirmPassword: 'password' });
    });

    it('should not emit save when submitting an invalid form', () => {
      spyOn(component.save, 'emit');

      component.form.get('password')?.setValue('abc');
      component.form.get('confirmPassword')?.setValue('password');
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.save.emit).not.toHaveBeenCalled();
    });

  });

  describe('validation messages', () => {

    it('should show validation messages for password when invalid', () => {
      fixture.componentRef.setInput('failures', new FailureStore({password: [{ message: 'Password is required' }]}));

      component.form.get('password')?.markAsTouched();
      fixture.detectChanges();

      const messages = fixture.nativeElement.querySelectorAll('p-message');
      expect(messages.length).toBeGreaterThan(0);
    });

  });

});

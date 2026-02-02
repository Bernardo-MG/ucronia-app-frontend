import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Login, LoginForm } from './login-form';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        LoginForm
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form valid status', () => {

    it('should have an invalid form by default', () => {
      expect(component.form.valid).toBeFalse();
    });

    it('should have a valid form when the username and password are not empty', () => {
      component.form.get('username')?.setValue('username');
      component.form.get('password')?.setValue('password');
      fixture.detectChanges();

      expect(component.form.valid).toBeTrue();
    });

  });

  describe('form enabled status', () => {

    it('should have an enabled form by default', () => {
      expect(component.form.enabled).toBeTrue();
    });

    it('should have a not enabled form when waiting', () => {
      component.waiting = true;
      fixture.detectChanges();

      expect(component.form.enabled).toBeFalse();
    });

  });

  describe('enabled status', () => {

    it('should disable the login button by default', () => {
      const button = fixture.debugElement.nativeElement.querySelector('#login button');
      expect(button.hasAttribute('disabled')).toBeTrue();
    });

    it('should enable the login button when both username and password are set', () => {
      component.form.get('username')?.setValue('username');
      component.form.get('password')?.setValue('password');
      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('#login button');
      expect(button.hasAttribute('disabled')).toBeFalse();
    });

    it('should disable the login button when missing the username', () => {
      component.form.get('password')?.setValue('password');
      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('#login button');
      expect(button.hasAttribute('disabled')).toBeTrue();
    });

    it('should disable the login button when missing the password', () => {
      component.form.get('username')?.setValue('username');
      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('#login button');
      expect(button.hasAttribute('disabled')).toBeTrue();
    });

  });

  describe('enabled status on waiting', () => {

    it('should disable the login button when the form is valid but it is waiting', () => {
      component.form.get('username')?.setValue('username');
      component.form.get('password')?.setValue('password');
      component.waiting = true;
      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('#login button');
      expect(button.hasAttribute('disabled')).toBeTrue();
    });

    it('should disable the login button when the form is waiting', () => {
      component.waiting = true;
      fixture.detectChanges();

      const button = fixture.debugElement.nativeElement.querySelector('#login button');
      expect(button.hasAttribute('disabled')).toBeTrue();
    });

  });

  describe('remember me', () => {

    it('should enable the remember me check button by default', () => {
      const rememberMe = fixture.debugElement.nativeElement.querySelector('#rememberMe');

      expect(rememberMe.disabled).toEqual(false);
    });

    it('should disable the remember me check button when waiting', () => {
      component.waiting = true;
      fixture.detectChanges();

      const rememberMe = fixture.debugElement.nativeElement.querySelector('#rememberMe');

      expect(rememberMe.disabled).toEqual(true);
    });

  });

  describe('inputs', () => {

    it('should enable the inputs by default', () => {
      const username = fixture.debugElement.nativeElement.querySelector('#usernameInput');
      const password = fixture.debugElement.nativeElement.querySelector('#passwordInput');

      expect(username.disabled).toEqual(false);
      expect(password.disabled).toEqual(false);
    });

    it('should disable the inputs when waiting', () => {
      component.waiting = true;
      fixture.detectChanges();

      const username = fixture.debugElement.nativeElement.querySelector('#usernameInput');
      const password = fixture.debugElement.nativeElement.querySelector('#passwordInput');

      expect(username.disabled).toEqual(true);
      expect(password.disabled).toEqual(true);
    });

  });

  describe('output', () => {

    it('should emit login when submitting a valid form', () => {
      spyOn(component.login, 'emit');

      component.form.get('username')?.setValue('username');
      component.form.get('password')?.setValue('password');
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.login.emit).toHaveBeenCalledWith(new Login('username', 'password'));
    });

    it('should not emit login when submitting an invalid form', () => {
      spyOn(component.login, 'emit');

      component.form.get('username')?.setValue('');
      component.form.get('password')?.setValue('');
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.login.emit).not.toHaveBeenCalled();
    });

    it('should emit login when clicking the login button', () => {
      spyOn(component.login, 'emit');

      component.form.get('username')?.setValue('username');
      component.form.get('password')?.setValue('password');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#login button');
      button.click();

      expect(component.login.emit).toHaveBeenCalledWith(new Login('username', 'password'));
    });

    it('should not emit login when clicking the login button and the form is invalid', () => {
      spyOn(component.login, 'emit');

      component.form.get('username')?.setValue('');
      component.form.get('password')?.setValue('');
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.login.emit).not.toHaveBeenCalled();
    });

    it('should emit lost password when clicking the lost password button', () => {
      spyOn(component.lostPassword, 'emit');

      component.form.get('username')?.setValue('username');
      component.form.get('password')?.setValue('password');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#lostPassword');
      button.click();

      expect(component.lostPassword.emit).toHaveBeenCalled();
    });

    it('should not emit lost password when clicking the lost password button and it is disabled', () => {
      spyOn(component.lostPassword, 'emit');

      component.waiting = true;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('#lostPassword');
      button.click();

      expect(component.lostPassword.emit).not.toHaveBeenCalled();
    });

    it('should emit remember me when changing the remember me checkbox', () => {
      spyOn(component.rememberMe, 'emit');

      const checkbox = fixture.debugElement.nativeElement.querySelector('#rememberMe');
      checkbox.click();

      expect(component.rememberMe.emit).toHaveBeenCalledTimes(1);
    });

    it('should emit remember me with active flag when changing the remember me checkbox', () => {
      spyOn(component.rememberMe, 'emit');

      const checkbox = fixture.debugElement.nativeElement.querySelector('#rememberMe');
      checkbox.click();

      expect(component.rememberMe.emit).toHaveBeenCalledWith(true);
    });

    it('should emit remember me when changing back the remember me checkbox', () => {
      spyOn(component.rememberMe, 'emit');

      const checkbox = fixture.debugElement.nativeElement.querySelector('#rememberMe');
      checkbox.click();
      checkbox.click();

      expect(component.rememberMe.emit).toHaveBeenCalledTimes(2);
    });

    it('should emit remember me with inactive flag when changing back the remember me checkbox', () => {
      spyOn(component.rememberMe, 'emit');

      const checkbox = fixture.debugElement.nativeElement.querySelector('#rememberMe');
      checkbox.click();
      checkbox.click();

      expect(component.rememberMe.emit).toHaveBeenCalledWith(true);
      expect(component.rememberMe.emit).toHaveBeenCalledWith(false);
    });

    it('should not emit remember me when when changing the remember me checkbox and it is disabled', () => {
      spyOn(component.rememberMe, 'emit');

      component.waiting = true;
      fixture.detectChanges();

      const checkbox = fixture.debugElement.nativeElement.querySelector('#rememberMe');
      checkbox.click();

      expect(component.rememberMe.emit).not.toHaveBeenCalled();
    });

  });

  describe('failed login warning', () => {

    it('should hide the login failure warning by default', () => {
      const warning = fixture.debugElement.nativeElement.querySelector('#loginFailedWarning');

      expect(warning).toBeNull();
    });

    it('should hide the login failure warning when receiving the failure flag as false', () => {
      component.failedLogin = false;
      fixture.detectChanges();

      const warning = fixture.debugElement.nativeElement.querySelector('#loginFailedWarning');

      expect(warning).toBeNull();
    });

    it('should show the login failure warning when receiving the failure flag', () => {
      component.failedLogin = true;
      fixture.detectChanges();

      const warning = fixture.debugElement.nativeElement.querySelector('#loginFailedWarning');

      expect(warning).not.toBeUndefined();
    });

  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LoginFormComponent } from './login-form.component';
import { SimpleChange } from '@angular/core';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        IconsModule
      ],
      declarations: [
        LoginFormComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // **************************************************************************
  // General tests
  // **************************************************************************

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // **************************************************************************
  // Login button
  // **************************************************************************

  it('should disable the login button by default', () => {
    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the login button when both username and password are set', () => {
    component.form.controls['username'].setValue('username');
    component.form.controls['password'].setValue('password');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the login button when missing the username', () => {
    component.form.controls['password'].setValue('password');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the login button when missing the password', () => {
    component.form.controls['username'].setValue('username');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the login button when the form is valid but it is waiting', () => {
    component.form.controls['username'].setValue('username');
    component.form.controls['password'].setValue('password');
    component.waiting = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the login button when the form is waiting', () => {
    component.waiting = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  // **************************************************************************
  // Remember me
  // **************************************************************************

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

  // **************************************************************************
  // Inputs
  // **************************************************************************

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

  // **************************************************************************
  // Events
  // **************************************************************************

  it('should send a login event when clicking the login button', () => {
    spyOn(component.login, 'emit');

    component.form.controls['username'].setValue('username');
    component.form.controls['password'].setValue('password');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    button.click();

    expect(component.login.emit).toHaveBeenCalledTimes(1);
  });

  it('should send a remember me event when changing the remember me checkbox', () => {
    spyOn(component.rememberMe, 'emit');

    const checkbox = fixture.debugElement.nativeElement.querySelector('#rememberMe');
    checkbox.click();

    expect(component.rememberMe.emit).toHaveBeenCalledTimes(1);
  });

  it('should send a remember me event with active flag when changing the remember me checkbox', () => {
    spyOn(component.rememberMe, 'emit');

    const checkbox = fixture.debugElement.nativeElement.querySelector('#rememberMe');
    checkbox.click();

    expect(component.rememberMe.emit).toHaveBeenCalledWith(true);
  });

  it('should send a remember me event when changing back the remember me checkbox', () => {
    spyOn(component.rememberMe, 'emit');

    const checkbox = fixture.debugElement.nativeElement.querySelector('#rememberMe');
    checkbox.click();
    checkbox.click();

    expect(component.rememberMe.emit).toHaveBeenCalledTimes(2);
  });

  it('should send a remember me event with inactive flag when changing back the remember me checkbox', () => {
    spyOn(component.rememberMe, 'emit');

    const checkbox = fixture.debugElement.nativeElement.querySelector('#rememberMe');
    checkbox.click();
    checkbox.click();

    expect(component.rememberMe.emit).toHaveBeenCalledWith(true);
    expect(component.rememberMe.emit).toHaveBeenCalledWith(false);
  });

  // **************************************************************************
  // Failed login warning
  // **************************************************************************

  it('should hide the login failure warning by default', () => {
    const warning = fixture.debugElement.nativeElement.querySelector('#loginFailedWarning');

    expect(warning).toBeNull();
  });

  it('should hide the login failure warning when receiving the failure flag as false', () => {
    component.failed = false;
    fixture.detectChanges();

    const warning = fixture.debugElement.nativeElement.querySelector('#loginFailedWarning');

    expect(warning).toBeNull();
  });

  it('should show the login failure warning when receiving the failure flag', () => {
    component.failed = true;
    fixture.detectChanges();

    const warning = fixture.debugElement.nativeElement.querySelector('#loginFailedWarning');

    expect(warning).not.toBeUndefined();
  });

});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ControlsModule } from '@app/controls/controls.module';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ControlsModule
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('should disable the login button when the form is valid but it is loading', () => {
    component.form.controls['username'].setValue('username');
    component.form.controls['password'].setValue('password');
    component.loading = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the login button when the form is loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

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

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountChangePasswordFormComponent } from './account-change-password-form.component';

describe('AccountChangePasswordFormComponent', () => {
  let component: AccountChangePasswordFormComponent;
  let fixture: ComponentFixture<AccountChangePasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        AccountChangePasswordFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountChangePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the save button by default', () => {
    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the login button when all the data is set', () => {
    component.form.controls['oldPassword'].setValue('1234');
    component.form.controls['newPassword'].setValue('abcd');
    component.form.controls['passwordRepeat'].setValue('abcd');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the save button when the password does not match', () => {
    component.form.controls['oldPassword'].setValue('1234');
    component.form.controls['newPassword'].setValue('abcd');
    component.form.controls['passwordRepeat'].setValue('abcde');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  it('should send a change password event when clicking the save button', () => {
    spyOn(component.changePassword, 'emit');

    component.form.controls['oldPassword'].setValue('1234');
    component.form.controls['newPassword'].setValue('abcd');
    component.form.controls['passwordRepeat'].setValue('abcd');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    button.click();

    expect(component.changePassword.emit).toHaveBeenCalledTimes(1);
  });

});

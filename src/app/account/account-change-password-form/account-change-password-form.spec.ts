import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountChangePasswordForm } from './account-change-password-form';

describe('AccountChangePasswordForm', () => {
  let component: AccountChangePasswordForm;
  let fixture: ComponentFixture<AccountChangePasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AccountChangePasswordForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountChangePasswordForm);
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
    component.form.get('oldPassword').setValue('1234');
    component.form.get('newPassword').setValue('abcd');
    component.form.get('passwordRepeat').setValue('abcd');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the save button when the password does not match', () => {
    component.form.get('oldPassword').setValue('1234');
    component.form.get('newPassword').setValue('abcd');
    component.form.get('passwordRepeat').setValue('abcde');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  //it('should send a change password event when clicking the save button', () => {
  //  spyOn(component.save, 'emit');
  //
  //    component.form.get('oldPassword').setValue('1234');
  //    component.form.get('newPassword').setValue('abcd');
  //    component.form.get('passwordRepeat').setValue('abcd');
  //   fixture.detectChanges();
  //
  //    const button = fixture.nativeElement.querySelector('form button');
  //    button.click();
  //
  //    expect(component.save.emit).toHaveBeenCalledTimes(1);
  //  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PasswordResetRequestFormComponent } from './password-reset-request-form.component';

describe('PasswordResetRequestFormComponent', () => {
  let component: PasswordResetRequestFormComponent;
  let fixture: ComponentFixture<PasswordResetRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PasswordResetRequestFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form status', () => {

    it('should have the form invalid by default', () => {
      expect(component.form.valid).toBeFalse();
    });

  });

  describe('email validation', () => {

    it('should have an invalid email when the email is empty', () => {
      const emailControl = component.form.get('email');
      component.form.get('email').setValue('');
      fixture.detectChanges();

      expect(emailControl.valid).toBeFalse();
    });

    it('should have an invalid email when the email format is invalid', () => {
      const emailControl = component.form.get('email');
      component.form.get('email').setValue('abc');
      fixture.detectChanges();

      expect(emailControl.valid).toBeFalse();
    });

    it('should have an valid email when the email format is valid', () => {
      const emailControl = component.form.get('email');
      component.form.get('email').setValue('test@example.com');
      fixture.detectChanges();

      expect(emailControl.valid).toBeTrue();
    });

  });

  describe('enabled form button status on password match', () => {

    it('should enable the form button when the form is valid', () => {
      component.form.get('email').setValue('test@example.com');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toBeFalse();
    });

    it('should disable the form button when the form is invalid', () => {
      component.form.get('email').setValue('abc');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toBeTrue();
    });

  });

  describe('output', () => {

    it('should emit save when submitting a valid form', () => {
      spyOn(component.save, 'emit');

      component.form.get('email').setValue('test@example.com');
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.save.emit).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('should not emit save when submitting an invalid form', () => {
      spyOn(component.save, 'emit');

      component.form.get('email').setValue('');
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.save.emit).not.toHaveBeenCalled();
    });

  });

});

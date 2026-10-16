import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PasswordResetRequestForm } from './password-reset-request-form';

describe('PasswordResetRequestForm', () => {
  let component: PasswordResetRequestForm;
  let fixture: ComponentFixture<PasswordResetRequestForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PasswordResetRequestForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequestForm);
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
      component.form.get('email')?.setValue('');
      component.form.markAsDirty();
      fixture.detectChanges();

      expect(emailControl?.valid).toBeFalse();
    });

    it('should have an invalid email when the email format is invalid', () => {
      const emailControl = component.form.get('email');
      component.form.get('email')?.setValue('abc');
      component.form.markAsDirty();
      fixture.detectChanges();

      expect(emailControl?.valid).toBeFalse();
    });

    it('should have an valid email when the email format is valid', () => {
      const emailControl = component.form.get('email');
      component.form.get('email')?.setValue('test@example.com');
      component.form.markAsDirty();
      fixture.detectChanges();

      expect(emailControl?.valid).toBeTrue();
    });

  });

  describe('enabled form button status on password match', () => {

    it('should enable the form button when the form is valid', () => {
      component.form.get('email')?.setValue('test@example.com');
      component.form.markAsDirty();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toBeFalse();
    });

    it('should disable the form button when the form is invalid', () => {
      component.form.get('email')?.setValue('abc');
      component.form.markAsDirty();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toBeTrue();
    });

  });

  describe('output', () => {

    it('should emit save when submitting a valid form', () => {
      spyOn(component.save, 'emit');

      component.form.get('email')?.setValue('test@example.com');
      component.form.markAsDirty();
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.save.emit).toHaveBeenCalledWith('test@example.com');
    });

    it('should not emit save when submitting an invalid form', () => {
      spyOn(component.save, 'emit');

      component.form.get('email')?.setValue('');
      component.form.markAsDirty();
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.save.emit).not.toHaveBeenCalled();
    });

  });

  it('blocks requests while loading and accepts changes afterwards', () => {
    component.form.setValue({ email: 'test@example.com' });
    component.form.markAsDirty();
    const emitted = spyOn(component.save, 'emit');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    component.onSave();
    expect(component.form.disabled).toBeTrue();
    expect(emitted).not.toHaveBeenCalled();
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    component.onSave();
    expect(emitted).toHaveBeenCalledWith('test@example.com');
  });

  it('does not submit a valid pristine form', () => {
    component.form.setValue({ email: 'test@example.com' });
    const emitted = spyOn(component.save, 'emit');
    expect(component.form.pristine).toBeTrue();
    expect(component.saveEnabled).toBeFalse();
    component.onSave();
    expect(emitted).not.toHaveBeenCalled();
  });

});

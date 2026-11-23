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
      expect(component.form.valid).toBe(false);
    });

  });

  describe('email validation', () => {

    it('should have an invalid email when the email is empty', () => {
      const emailControl = component.form.get('email');
      component.form.get('email')?.setValue('');
      component.form.markAsDirty();
      fixture.detectChanges();

      expect(emailControl?.valid).toBe(false);
    });

    it('should have an invalid email when the email format is invalid', () => {
      const emailControl = component.form.get('email');
      component.form.get('email')?.setValue('abc');
      component.form.markAsDirty();
      fixture.detectChanges();

      expect(emailControl?.valid).toBe(false);
    });

    it('should have an valid email when the email format is valid', () => {
      const emailControl = component.form.get('email');
      component.form.get('email')?.setValue('test@example.com');
      component.form.markAsDirty();
      fixture.detectChanges();

      expect(emailControl?.valid).toBe(true);
    });

  });

  describe('enabled form button status on password match', () => {

    it('should enable the form button when the form is valid', () => {
      component.form.get('email')?.setValue('test@example.com');
      component.form.markAsDirty();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toBe(false);
    });

    it('should disable the form button when the form is invalid', () => {
      component.form.get('email')?.setValue('abc');
      component.form.markAsDirty();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('form button');
      expect(button.disabled).toBe(true);
    });

  });

  describe('output', () => {

    it('should emit save when submitting a valid form', () => {
      vi.spyOn(component.save, 'emit').mockReturnValue(undefined);

      component.form.get('email')?.setValue('test@example.com');
      component.form.markAsDirty();
      fixture.detectChanges();

      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(component.save.emit).toHaveBeenCalledWith('test@example.com');
    });

    it('should not emit save when submitting an invalid form', () => {
      vi.spyOn(component.save, 'emit').mockReturnValue(undefined);

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
    const emitted = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    component.onSave();
    expect(component.form.disabled).toBe(true);
    expect(emitted).not.toHaveBeenCalled();
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    component.onSave();
    expect(emitted).toHaveBeenCalledWith('test@example.com');
  });

  it('does not submit a valid pristine form', () => {
    component.form.setValue({ email: 'test@example.com' });
    const emitted = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    expect(component.form.pristine).toBe(true);
    expect(component.saveEnabled).toBe(false);
    component.onSave();
    expect(emitted).not.toHaveBeenCalled();
  });

});

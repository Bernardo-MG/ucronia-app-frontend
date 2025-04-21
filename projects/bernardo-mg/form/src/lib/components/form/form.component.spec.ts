import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FailureStore } from '@bernardo-mg/request';
import { FormComponent } from './form.component';

@Component({
  selector: 'form-test-form',
  template: '',
  standalone: true,
  imports: [ReactiveFormsModule]
})
class TestFormComponent extends FormComponent<any> {
  constructor(private fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
}

describe('FormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TestFormComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable form when readonly is set', () => {
    component.readonly = true;
    expect(component.form.disabled).toBeTrue();
  });

  it('should disable form when waiting is set', () => {
    component.waiting = true;
    expect(component.form.disabled).toBeTrue();
  });

  it('should enable form when not readonly and not waiting', () => {
    component.readonly = false;
    component.waiting = false;
    expect(component.form.enabled).toBeTrue();
  });

  it('should emit save when form is valid', () => {
    spyOn(component.save, 'emit');
    component.form.setValue({ name: 'John', email: 'john@example.com' });
    component.onSave();
    expect(component.save.emit).toHaveBeenCalledWith({ name: 'John', email: 'john@example.com' });
  });

  it('should not emit save when form is invalid', () => {
    spyOn(component.save, 'emit');
    component.form.get('name')?.setValue('');
    component.form.get('email')?.setValue('');
    component.form.get('name')?.markAsTouched();
    component.form.get('email')?.markAsTouched();
    component.form.markAsDirty();
    component.form.markAsTouched();
    component.form.updateValueAndValidity();
    component.onSave();
    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should emit reject on cancel', () => {
    spyOn(component.reject, 'emit');
    component.onCancel();
    expect(component.reject.emit).toHaveBeenCalled();
  });

  it('should load data into form', () => {
    const data = { name: 'Alice', email: 'alice@example.com' };
    component.data = data;
    expect(component.form.value).toEqual(data);
  });

  it('save is enabled when the form is valid, not waiting and not readonly', () => {
    component.readonly = false;
    component.waiting = false;
    component.form.setValue({ name: 'Valid', email: 'valid@example.com' });
    expect(component.saveEnabled).toBeTrue();
  });

  it('save is disabled when the form is readonly', () => {
    component.readonly = true;
    component.waiting = false;
    component.form.setValue({ name: 'Valid', email: 'valid@example.com' });
    expect(component.saveEnabled).toBeFalse();
  });

  it('cancel is enabled when the form is cancellable, not waiting and not readonly', () => {
    component.cancellable = true;
    component.readonly = false;
    component.waiting = false;
    expect(component.cancelEnabled).toBeTrue();
  });

  it('cancel is disabled when the form is not cancellable', () => {
    component.cancellable = false;
    component.readonly = false;
    component.waiting = false;
    expect(component.cancelEnabled).toBeFalse();
  });

  it('a field with errors is invalid', () => {
    const failures = new FailureStore();
    component.failures = failures;
    const control = component.form.get('name');
    control?.setErrors({ required: true });
    control?.markAsTouched();
    fixture.detectChanges();
    expect(component.isFieldInvalid('name')).toBeTrue();
  });

  it('a field with failures is invalid', () => {
    const failures = new FailureStore();
    spyOn(failures, 'hasFailures').and.returnValue(true);
    component.failures = failures;
    expect(component.isFieldInvalid('email')).toBeTrue();
  });

});

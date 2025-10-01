import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormWithSelection } from './form-with-selection';
import { By } from '@angular/platform-browser';

describe('FormWithSelection', () => {
  let component: FormWithSelection;
  let fixture: ComponentFixture<FormWithSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWithSelection, FormsModule, ReactiveFormsModule, ButtonModule, TableModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormWithSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
    expect(component.selecting).toBeFalse();
  });

  it('should load data when the data is set', () => {
    const data = { number: 1, name: 'Test' };
    component.data = data;

    expect(component.form.value as any).toEqual(data);
    expect(component.name).toBe('Test');
  });

  describe('selection', () => {

    it('should enter selecting mode when starts selecting', () => {
      component.onStartSelecting();
      expect(component.selecting).toBeTrue();
    });

    it('should load data when selected and exit selecting mode', () => {
      component.onStartSelecting();
      const selection = { number: 2, name: 'Selected' };
      component.onSelect(selection);

      expect(component.form.value as any).toEqual(selection);
      expect(component.selecting).toBeFalse();
    });

  });

  describe('save', () => {

    it('should emit save event when form is valid', () => {
      const spy = jasmine.createSpy();
      component.save.subscribe(spy);

      component.data = { number: 1, name: 'Save Test' };

      // Trigger ngSubmit manually
      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(spy).toHaveBeenCalledWith({ number: 1, name: 'Save Test' });
    });

    it('should not emit save event when form is invalid', () => {
      const spy = jasmine.createSpy();
      component.save.subscribe(spy);

      // Empty form

      // Trigger ngSubmit manually
      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(spy).not.toHaveBeenCalled();
    });

  });

  describe('save button', () => {

    it('should disable save button when the form is invalid', () => {
      component.data = { number: 1, name: '' };

      expect(component.formStatus.saveEnabled).toBeFalse();
    });

    it('should enable save button when the form is valid and dirty', () => {
      component.data = { number: 1, name: 'Test' };
      component.form.markAsDirty();

      expect(component.formStatus.saveEnabled).toBeTrue();
    });

    it('should disable save button when loading', () => {
      component.data = { number: 1, name: 'Test' };
      component.form.markAsDirty();
      component.formStatus.loading = true;

      expect(component.formStatus.saveEnabled).toBeFalse();
    });

  });

});

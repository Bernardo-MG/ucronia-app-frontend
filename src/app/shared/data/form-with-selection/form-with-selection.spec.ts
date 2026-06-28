import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Page } from '@bernardo-mg/request';
import { FormWithSelection } from './form-with-selection';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('FormWithSelection', () => {
  let component: FormWithSelection;
  let fixture: ComponentFixture<FormWithSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWithSelection, FormsModule, ReactiveFormsModule, ButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormWithSelection);
    fixture.componentRef.setInput('getSelection', () => of(new Page<any>()));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
  });

  it('should load data when the data is set', () => {
    const data = { number: 1, name: 'Test' };
    component.data = data;

    expect(component.form.value as any).toEqual(data);
    expect(component.name).toBe('Test');
  });

  describe('selection', () => {
    it('should load data when selected', () => {
      const selection = { number: 2, name: 'Selected' };
      component.options = [selection];
      component.onChoose(selection.number);

      expect(component.form.value as any).toEqual(selection);
    });

    it('should load all options from selection endpoint', () => {
      const page = new Page<any>();
      page.content = [{ number: 1, name: 'A' }];
      page.last = true;
      page.totalPages = 1;

      fixture.componentRef.setInput('getSelection', () => of(page));
      fixture = TestBed.createComponent(FormWithSelection);
      fixture.componentRef.setInput('getSelection', () => of(page));
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.options).toEqual(page.content);
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

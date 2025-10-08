import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FailureStore } from '@bernardo-mg/request';
import { NameNumber } from '../model/name-number';
import { NameForm } from './name-form';

describe('NameForm', () => {
  let component: NameForm;
  let fixture: ComponentFixture<NameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NameForm
      ],
      providers: [
        provideAnimationsAsync()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NameForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
    expect(component.form.controls['name']).toBeDefined();
    expect(component.form.controls['number']).toBeDefined();
  });

  describe('save', () => {

    it('should emit save event when form is valid', () => {
      const spy = jasmine.createSpy();
      component.save.subscribe(spy);

      component.form.patchValue({ name: 'Alice', number: 1 });

      // Trigger ngSubmit manually
      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(spy).toHaveBeenCalledWith({ name: 'Alice', number: 1 } as NameNumber);
    });

    it('should not emit save event when the form is invalid', () => {
      const spy = jasmine.createSpy();
      component.save.subscribe(spy);

      component.form.patchValue({ name: '', number: 0 });

      // Trigger ngSubmit manually
      const formEl = fixture.debugElement.query(By.css('form'));
      formEl.triggerEventHandler('ngSubmit', {});

      expect(spy).not.toHaveBeenCalled();
    });

  });

  it('should display validation messages for failures', () => {
    fixture.componentRef.setInput('failures', new FailureStore({
      'name': [{ message: 'Name is required' }]
    }));

    fixture.detectChanges();

    const messages = fixture.debugElement.queryAll(By.css('p-message'));
    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].nativeElement.textContent).toContain('Name is required');
  });

});

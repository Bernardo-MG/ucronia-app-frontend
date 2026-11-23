import type { Mock } from 'vitest';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Key } from '@ucronia/domain';
import { MemberKeyForm } from './member-key-form';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('MemberKeyForm', () => {
  let component: MemberKeyForm;
  let fixture: ComponentFixture<MemberKeyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberKeyForm],
      providers: [provideAnimationsAsync(), provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberKeyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch initial values when data is passed', () => {
    const key = new Key();
    key.number = 10;
    key.available = false;
    key.description = 'Puerta principal';

    fixture.componentRef.setInput('data', key);
    fixture.detectChanges();

    expect(component.form.get('number')?.value).toBe(10);
    expect(component.form.get('available')?.value).toBe(false);
    expect(component.form.get('description')?.value).toBe('Puerta principal');
  });

  it('should emit the submitted data', () => {
    const emitted = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);

    component.form.patchValue({
      number: 12,
      available: true,
      description: 'Patio'
    });
    component.form.markAsDirty();

    component.onSave();

    expect(emitted).toHaveBeenCalledTimes(1);

    expect(emitted).toHaveBeenCalledWith({
      number: 12,
      available: true,
      description: 'Patio'
    });
  });

  it('requires a dirty form when creating a key', () => {
    const emitted = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    expect(component.form.pristine).toBe(true);
    expect(component.saveEnabled).toBe(false);
    component.onSave();
    expect(emitted).not.toHaveBeenCalled();
    component.form.get('description')?.setValue('Main entrance');
    component.form.markAsDirty();
    component.onSave();
    expect(emitted).toHaveBeenCalledTimes(1);
  });

  it('does not submit an unchanged existing key', () => {
    component.data = Object.assign(new Key(), { number: 10, available: true });
    const emitted = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    expect(component.saveEnabled).toBe(false);
    component.onSave();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('should reset edits and touched state when another key is loaded', () => {
    fixture.componentRef.setInput('data', Object.assign(new Key(), { number: 10, description: 'Principal' }));
    fixture.detectChanges();
    component.form.patchValue({ description: 'Changed' });
    component.form.markAsDirty();
    component.form.markAllAsTouched();

    fixture.componentRef.setInput('data', Object.assign(new Key(), { number: 20, description: 'Lateral' }));
    fixture.detectChanges();

    expect(component.form.getRawValue()).toEqual({ number: 20, available: true, description: 'Lateral' });
    expect(component.form.pristine).toBe(true);
    expect(component.form.untouched).toBe(true);
    expect(component.saveEnabled).toBe(false);
  });
});

describe('MemberKeyForm form submission', () => {
  const scenario = { values: { number: 2, available: true, description: 'Front door' }, expected: { number: 2, available: true, description: 'Front door' } };

  let fixture: ComponentFixture<MemberKeyForm>;
  let component: MemberKeyForm;
  let emitted: Mock;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MemberKeyForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(MemberKeyForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
    fixture.componentRef.setInput('formId', 'form-contract');

    form.patchValue(scenario.values);

    form.markAsPristine();
    emitted = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
    fixture.detectChanges();
    expect(form.valid,'explicit fixture must be valid').toBe(true);
  });

  function edit(): void {
    form.markAsDirty();
  }

  function submit(): void {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  it('does not submit valid unchanged data', () => {
    expect(component.saveEnabled).toBe(false);
    submit();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the public payload once through native submission', () => {
    edit();
    submit();
    expect(emitted).toHaveBeenCalledTimes(1);
    expect(emitted).toHaveBeenCalledWith(scenario.expected);
  });

  it('blocks loading submissions and allows retry with the preserved edits', () => {
    edit();
    fixture.componentRef.setInput('loading', true);
    expect(component.formStatus.loading).toBe(true);
    expect(form.disabled).toBe(true);
    submit();
    expect(emitted).not.toHaveBeenCalled();
    fixture.componentRef.setInput('loading', false);
    expect(form.enabled).toBe(true);
    expect(form.dirty).toBe(true);
    submit();
    expect(emitted).toHaveBeenCalledTimes(1);
    expect(emitted).toHaveBeenCalledWith(scenario.expected);
  });

  it('leaves submit and cancel controls to the drawer', () => {
    expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
  });
});

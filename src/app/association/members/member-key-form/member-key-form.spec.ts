import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Key } from '@ucronia/domain';
import { MemberKeyForm } from './member-key-form';

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
    expect(component.form.get('available')?.value).toBeFalse();
    expect(component.form.get('description')?.value).toBe('Puerta principal');
  });

  it('should emit the submitted data', () => {
    const emitted = spyOn(component.save, 'emit');

    component.form.patchValue({
      number: 12,
      available: true,
      description: 'Patio'
    });
    component.form.markAsDirty();

    component.onSave();

    expect(emitted).toHaveBeenCalledOnceWith({
      number: 12,
      available: true,
      description: 'Patio'
    });
  });

  it('requires a dirty form when creating a key', () => {
    const emitted = spyOn(component.save, 'emit');
    expect(component.form.pristine).toBeTrue();
    expect(component.saveEnabled).toBeFalse();
    component.onSave();
    expect(emitted).not.toHaveBeenCalled();
    component.form.get('description')?.setValue('Main entrance');
    component.form.markAsDirty();
    component.onSave();
    expect(emitted).toHaveBeenCalledTimes(1);
  });

  it('does not submit an unchanged existing key', () => {
    component.data = Object.assign(new Key(), { number: 10, available: true });
    const emitted = spyOn(component.save, 'emit');
    expect(component.saveEnabled).toBeFalse();
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
    expect(component.form.pristine).toBeTrue();
    expect(component.form.untouched).toBeTrue();
    expect(component.saveEnabled).toBeFalse();
  });

});

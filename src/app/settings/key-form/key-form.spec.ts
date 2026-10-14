import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Key } from '@ucronia/domain';
import { KeyForm } from './key-form';

describe('KeyForm', () => {
  let component: KeyForm;
  let fixture: ComponentFixture<KeyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyForm],
      providers: [provideAnimationsAsync(), provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeyForm);
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
    let saved: Key | undefined;
    component.save.subscribe(value => saved = value);

    component.form.patchValue({
      number: 12,
      available: true,
      description: 'Patio'
    });

    component.onSave();

    expect(saved).toEqual({
      number: 12,
      available: true,
      description: 'Patio'
    });
  });
  it('allows creating a key with valid defaults and no optional edits', () => {
    const emitted = spyOn(component.save, 'emit');
    expect(component.form.pristine).toBeTrue();
    expect(component.saveEnabled).toBeTrue();
    component.onSave();
    expect(emitted).toHaveBeenCalledTimes(1);
    expect(emitted.calls.mostRecent().args[0].available).toBeTrue();
    expect(emitted.calls.mostRecent().args[0].description).toBe('');
  });

  it('does not submit an unchanged existing key', () => {
    component.data = Object.assign(new Key(), { number: 10, available: true });
    const emitted = spyOn(component.save, 'emit');
    expect(component.saveEnabled).toBeFalse();
    component.onSave();
    expect(emitted).not.toHaveBeenCalled();
  });

});

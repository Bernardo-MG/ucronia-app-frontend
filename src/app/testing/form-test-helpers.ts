import { Provider, Type, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

export function createFormFixture<T>(type: Type<T>, providers: Provider[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [type],
    providers: [provideZonelessChangeDetection(), provideNoopAnimations(), ...providers]
  });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture;
}

/** Programmatic patches do not set dirty: emulate the fields a user edited. */
export function editForm(form: FormGroup, values: Record<string, unknown>): void {
  form.patchValue(values);
  Object.keys(values).forEach(key => form.get(key)?.markAsDirty());
}

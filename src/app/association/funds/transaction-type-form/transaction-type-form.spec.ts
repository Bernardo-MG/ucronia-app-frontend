import type { Mock } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionTypeForm } from './transaction-type-form';

describe('TransactionTypeForm', () => {
  let fixture: ComponentFixture<TransactionTypeForm>;
  let component: TransactionTypeForm;
  let save: Mock;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TransactionTypeForm] });
    fixture = TestBed.createComponent(TransactionTypeForm);
    component = fixture.componentInstance;
    save = vi.spyOn(component.save, 'emit').mockReturnValue(undefined);
  });

  for (const [label, description, color] of [
    ['empty description', '', '#123456'],
    ['blank description', '   ', '#123456'],
    ['overlong description', 'a'.repeat(201), '#123456'],
    ['invalid color', 'Donación', '#123']
  ]) {
    it(`rejects ${label}`, () => {
      component.form.setValue({ description, color });
      component.form.markAsDirty();
      component.onSave();

      expect(component.form.invalid).toBe(true);
      expect(save).not.toHaveBeenCalled();
    });
  }

  it('prefills the form and emits the trimmed values', () => {
    fixture.componentRef.setInput('data', { number: 1, description: 'Donación', color: '#123456' });
    fixture.detectChanges();

    expect(component.form.getRawValue()).toEqual({ description: 'Donación', color: '#123456' });
    component.form.controls.description.setValue(' Cuota ');
    component.form.markAsDirty();
    component.onSave();

    expect(save).toHaveBeenCalledTimes(1);

    expect(save).toHaveBeenCalledWith({ description: 'Cuota', color: '#123456' });
  });

  it('blocks submission while loading', () => {
    fixture.componentRef.setInput('loading', true);
    component.form.setValue({ description: 'Cuota', color: '#123456' });

    component.onSave();

    expect(save).not.toHaveBeenCalled();
  });
});

import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { TransactionForm } from './transaction-form';

describe('TransactionForm', () => {
  let fixture: ComponentFixture<TransactionForm>;
  let component: TransactionForm;

  beforeEach(() => {
    fixture = createFormFixture(TransactionForm);
    component = fixture.componentInstance;
  });

  for (const [type, amount] of [['income', 25], ['expense', -25]] as const) {
    it(`serializes ${type} with the correct amount sign`, () => {
      const saved = spyOn(component.save, 'emit');
      const date = new Date(2026, 0, 15);
      editForm(component.form, { type, amount: 25, description: 'Club payment', date });
      component.onSave();
      expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ amount, description: 'Club payment', date }));
    });
  }

  it('rejects nonpositive transaction amounts', () => {
    editForm(component.form, { amount: 0 });
    expect(component.form.get('amount')?.hasError('min')).toBeTrue();
  });
});

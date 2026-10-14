import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { FeeEditionForm } from './fee-edition-form';
import { Fee } from '@ucronia/domain';

describe('FeeEditionForm', () => {
  let fixture: ComponentFixture<FeeEditionForm>;
  let component: FeeEditionForm;

  beforeEach(() => {
    fixture = createFormFixture(FeeEditionForm);
    component = fixture.componentInstance;
  });

  it('loads an unpaid fee without inventing a payment date', () => {
    fixture.componentRef.setInput('data', new Fee());
    fixture.detectChanges();
    expect(component.form.get('transaction.date')?.value).toBeNull();
    expect(component.form.invalid).toBeTrue();
    expect(component.form.pristine).toBeTrue();
  });

  it('submits the edited payment date in the transaction object', () => {
    const saved = spyOn(component.save, 'emit');
    const date = new Date(2026, 0, 15);
    editForm(component.form, { transaction: { date } });
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ transaction: { date } });
  });
});

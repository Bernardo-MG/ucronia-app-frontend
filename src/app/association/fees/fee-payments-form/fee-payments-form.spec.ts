import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture } from '@app/testing/form-test-helpers';
import { FeePaymentsForm } from './fee-payments-form';
import { Profile } from '@ucronia/domain';

describe('FeePaymentsForm', () => {
  let fixture: ComponentFixture<FeePaymentsForm>;
  let component: FeePaymentsForm;

  beforeEach(() => {
    fixture = createFormFixture(FeePaymentsForm);
    component = fixture.componentInstance;
  });

  it('creates a required month when selecting a member', () => {
    component.onSelectMember(Object.assign(new Profile(), { number: 7 }));
    expect(component.form.get('member')?.value).toBe(7);
    expect(component.months.length).toBe(1);
    expect(component.months.at(0).hasError('required')).toBeTrue();
  });

  it('removes only the selected month', () => {
    component.addDate();
    component.addDate();
    const month = new Date(2026, 0, 1);
    component.months.at(1).setValue(month);
    component.removeDate(0);
    expect(component.months.length).toBe(1);
    expect(component.months.at(0).value).toEqual(month);
  });
});

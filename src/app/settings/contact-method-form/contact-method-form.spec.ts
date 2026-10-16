import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { ContactMethodForm } from './contact-method-form';

describe('ContactMethodForm', () => {
  let fixture: ComponentFixture<ContactMethodForm>;
  let component: ContactMethodForm;

  beforeEach(() => {
    fixture = createFormFixture(ContactMethodForm);
    component = fixture.componentInstance;
  });

  it('requires a nonempty contact method name', () => {
    expect(component.form.invalid).toBeTrue();
    editForm(component.form, { name: 'Email' });
    expect(component.form.valid).toBeTrue();
  });

  it('loads existing data without making it dirty', () => {
    fixture.componentRef.setInput('data', { number: 8, name: 'Email' });
    fixture.detectChanges();
    expect(component.form.value).toEqual({ number: 8, name: 'Email' });
    expect(component.form.pristine).toBeTrue();
    expect(component.saveEnabled).toBeFalse();
  });
});

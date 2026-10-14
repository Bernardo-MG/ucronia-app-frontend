import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture } from '@app/testing/form-test-helpers';
import { UserTokenExtendForm } from './user-token-extend-form';

describe('UserTokenExtendForm', () => {
  let fixture: ComponentFixture<UserTokenExtendForm>;
  let component: UserTokenExtendForm;

  beforeEach(() => {
    fixture = createFormFixture(UserTokenExtendForm);
    component = fixture.componentInstance;
  });

  it('loads the existing expiration date as unchanged data', () => {
    const date = new Date(2026, 0, 15);
    fixture.componentRef.setInput('expirationDate', date);
    fixture.detectChanges();
    expect(component.form.get('expirationDate')?.value).toEqual(date);
    expect(component.form.pristine).toBeTrue();
    expect(component.saveEnabled).toBeFalse();
  });
});

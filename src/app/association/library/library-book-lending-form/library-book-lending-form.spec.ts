import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { Profile } from '@ucronia/domain';
import { LibraryBookLendingForm } from './library-book-lending-form';

describe('LibraryBookLendingForm', () => {
  let fixture: ComponentFixture<LibraryBookLendingForm>;
  let component: LibraryBookLendingForm;

  beforeEach(() => {
    fixture = createFormFixture(LibraryBookLendingForm);
    component = fixture.componentInstance;
  });

  it('includes the selected borrower and book in the lending event', () => {
    const saved = spyOn(component.save, 'emit');
    fixture.componentRef.setInput('book', 3);
    component.onSelectMember(Object.assign(new Profile(), { number: 7 }));
    const lendingDate = new Date(2026, 0, 15);
    editForm(component.form, { lendingDate });
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ book: 3, borrower: 7, lendingDate });
  });
});

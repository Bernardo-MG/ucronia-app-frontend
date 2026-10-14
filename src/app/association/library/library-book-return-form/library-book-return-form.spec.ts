import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { LibraryBookReturnForm } from './library-book-return-form';

describe('LibraryBookReturnForm', () => {
  let fixture: ComponentFixture<LibraryBookReturnForm>;
  let component: LibraryBookReturnForm;

  beforeEach(() => {
    fixture = createFormFixture(LibraryBookReturnForm);
    component = fixture.componentInstance;
  });

  it('includes the original borrower and book in the return event', () => {
    const saved = spyOn(component.save, 'emit');
    fixture.componentRef.setInput('book', 3);
    fixture.componentRef.setInput('borrower', 7);
    const returnDate = new Date(2026, 0, 15);
    editForm(component.form, { returnDate });
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ book: 3, borrower: 7, returnDate });
  });
});

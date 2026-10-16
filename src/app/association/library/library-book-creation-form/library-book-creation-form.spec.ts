import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { LibraryBookCreationForm } from './library-book-creation-form';

describe('LibraryBookCreationForm', () => {
  it('rejects malformed ISBNs but accepts an omitted optional ISBN', () => {
    const component = createFormFixture(LibraryBookCreationForm).componentInstance;
    editForm(component.form, { title: { title: 'A book' }, language: 'en', isbn: 'invalid' });
    expect(component.form.get('isbn')?.invalid).toBeTrue();
    component.form.get('isbn')?.setValue('');
    expect(component.saveEnabled).toBeTrue();
  });

  it('includes the selected book kind in the creation payload', () => {
    const component = createFormFixture(LibraryBookCreationForm).componentInstance;
    component.kind = 'fiction';
    editForm(component.form, { title: { title: 'A book' }, language: 'en' });
    const saved = spyOn(component.save, 'emit');
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ kind: 'fiction' }));
  });
});

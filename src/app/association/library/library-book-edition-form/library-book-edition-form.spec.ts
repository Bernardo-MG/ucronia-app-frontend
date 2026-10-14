import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { Author } from '@ucronia/domain';
import { of } from 'rxjs';
import { LibraryService } from '../library-service';
import { LibraryBookEditionForm } from './library-book-edition-form';

describe('LibraryBookEditionForm', () => {
  function createForm(): LibraryBookEditionForm {
    return createFormFixture(LibraryBookEditionForm, [{ provide: LibraryService, useValue: {
      getGameSystems: () => of({ content: [], last: true }),
      getBookTypes: () => of({ content: [], last: true })
    } }]).componentInstance;
  }

  it('prevents duplicate author selections and allows removal', () => {
    const component = createForm();
    const author = Object.assign(new Author(), { number: 7, name: 'Author' });
    component.onSelectAuthor(author);
    component.onSelectAuthor(author);
    expect(component.selectedAuthors).toEqual([author]);
    expect(component.form.dirty).toBeTrue();
    component.onRemoveAuthor(author);
    expect(component.selectedAuthors).toEqual([]);
  });

  it('omits an empty donation from the update payload', () => {
    const component = createForm();
    editForm(component.form, { title: { title: 'A book' }, language: 'en' });
    const saved = spyOn(component.save, 'emit');
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith(jasmine.objectContaining({ donation: undefined }));
  });
});

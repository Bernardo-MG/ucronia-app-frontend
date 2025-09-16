
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FictionBook } from '@app/domain/library/fiction-book';
import { GameBook } from '@app/domain/library/game-book';
import { Language } from '@app/domain/library/language';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { BookAdminConfig } from '../book-admin-config/book-admin-config';

@Component({
  selector: 'assoc-library-admin-book-edition-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, FloatLabelModule, ButtonModule, MessageModule, SelectModule, SaveControlsComponent],
  templateUrl: './library-admin-book-edition-form.html'
})
export class LibraryAdminBookEditionForm extends FormComponent<FictionBook | GameBook> {

  public readonly languages: Language[] = [];

  public view = 'form';

  constructor() {
    super();

    const fb = inject(FormBuilder);
    const config = inject(BookAdminConfig);

    this.languages = config.getLanguages();

    this.form = fb.group({
      number: [undefined],
      index: [-1],
      isbn: ['', isbnValidator()],
      title: fb.group({
        supertitle: [''],
        title: ['', Validators.required],
        subtitle: ['']
      }),
      language: ['', Validators.required],
      publishDate: [''],
      authors: [[]],
      donation: fb.group({
        date: [''],
        donors: [[]]
      }),
      bookType: [],
      publishers: [[]],
      gameSystem: []
    });
  }

}


import { Component, inject, input } from '@angular/core';
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

@Component({
  selector: 'assoc-library-admin-book-info-edition-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, FloatLabelModule, ButtonModule, MessageModule, SelectModule, SaveControlsComponent],
  templateUrl: './library-admin-book-info-edition-form.html'
})
export class LibraryAdminBookInfoEditionForm extends FormComponent<FictionBook | GameBook> {

  public readonly languages = input<Language[]>([]);

  public view = 'form';

  constructor() {
    const fb = inject(FormBuilder);

    super();

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

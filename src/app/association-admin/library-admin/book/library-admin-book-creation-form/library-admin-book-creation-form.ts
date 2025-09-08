
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookInfo } from '@app/domain/library/book-info';
import { Language } from '@app/domain/library/language';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { BookAdminConfig } from '../book-admin-config/book-admin-config';

@Component({
  selector: 'assoc-library-admin-book-creation-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, ButtonModule, MessageModule, SelectModule, SaveControlsComponent],
  templateUrl: './library-admin-book-creation-form.html'
})
export class LibraryAdminBookCreationForm extends FormComponent<BookInfo> {

  public readonly languages: Language[] = [];

  constructor() {
    super();

    const fb = inject(FormBuilder);
    const config = inject(BookAdminConfig);

    this.languages = config.getLanguages();

    this.form = fb.group({
      isbn: ['', isbnValidator()],
      title: fb.group({
        supertitle: [''],
        title: ['', Validators.required],
        subtitle: ['']
      }),
      language: ['', Validators.required]
    });
  }

}

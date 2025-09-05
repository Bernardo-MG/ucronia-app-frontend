
import { Component, inject, input } from '@angular/core';
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

@Component({
  selector: 'assoc-library-admin-book-creation-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, ButtonModule, MessageModule, SelectModule, SaveControlsComponent],
  templateUrl: './library-admin-book-creation-form.html'
})
export class LibraryAdminBookCreationForm extends FormComponent<BookInfo> {

  public readonly languages = input<Language[]>([]);

  constructor() {
    super();

    const fb = inject(FormBuilder);

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

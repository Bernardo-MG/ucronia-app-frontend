
import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Language } from '@app/models/library/language';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { BookInfo } from '../../../../../models/library/book-info';

@Component({
  selector: 'assoc-library-admin-book-creation-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, ButtonModule, MessageModule, SaveControlsComponent, SelectModule],
  templateUrl: './library-admin-book-creation-form.component.html'
})
export class LibraryAdminBookCreationFormComponent extends FormComponent<BookInfo> {

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


import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Language } from '@app/domain/library/language';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';
import { BookInfo } from '@app/domain/library/book-info';

@Component({
  selector: 'assoc-library-admin-book-creation-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-book-creation-form.component.html'
})
export class LibraryAdminBookCreationFormComponent extends FormComponent<BookInfo> {

  public readonly languages = input<Language[]>([]);

  constructor() {
    const fb = inject(FormBuilder);

    super();

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

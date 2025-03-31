import { CommonModule, } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Language } from '@app/models/library/language';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';
import { BookInfo } from '../../../../../models/library/book-info';

@Component({
  selector: 'assoc-library-admin-book-creation-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-book-creation-form.component.html'
})
export class LibraryAdminBookCreationFormComponent extends FormComponent<BookInfo> {

  @Input() public languages: Language[] = [];

  constructor(
    fb: FormBuilder
  ) {
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

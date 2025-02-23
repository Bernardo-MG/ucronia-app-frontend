import { CommonModule, } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '@app/models/library/book';
import { Language } from '@app/models/library/language';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { InputFailureFeedbackComponent } from '@app/shared/form/components/input-failure-feedback/input-failure-feedback.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { InvalidFieldDirective } from '@bernardo-mg/form';
import { isbnValidator } from '@app/shared/validator/isbn.validator';

@Component({
    selector: 'assoc-library-admin-book-creation-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
    templateUrl: './library-admin-book-creation-form.component.html'
})
export class LibraryAdminBookCreationFormComponent extends FormComponent<Book> {

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


import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookType } from '@app/domain/library/book-type';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';

@Component({
  selector: 'assoc-library-admin-book-type-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-book-type-form.component.html'
})
export class LibraryAdminBookTypeFormComponent extends FormComponent<BookType> {

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

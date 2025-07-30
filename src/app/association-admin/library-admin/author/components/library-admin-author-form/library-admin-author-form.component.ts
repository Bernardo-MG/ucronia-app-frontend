
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Author } from '@app/models/library/author';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';

@Component({
  selector: 'assoc-library-admin-author-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-author-form.component.html'
})
export class LibraryAdminAuthorFormComponent extends FormComponent<Author> {

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

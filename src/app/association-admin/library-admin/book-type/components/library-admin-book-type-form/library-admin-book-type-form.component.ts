
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookType } from '@app/domain/library/book-type';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-admin-book-type-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputTextModule, FloatLabelModule, MessageModule],
  templateUrl: './library-admin-book-type-form.component.html'
})
export class LibraryAdminBookTypeFormComponent extends FormComponent<BookType> {

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      name: ['']
    });
  }

}

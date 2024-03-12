import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Book } from '../../models/book';

@Component({
  selector: 'library-book-create-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, LayoutModule ],
  templateUrl: './library-book-create-form.component.html'
})
export class LibraryBookCreateFormComponent extends FormComponent<Book> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

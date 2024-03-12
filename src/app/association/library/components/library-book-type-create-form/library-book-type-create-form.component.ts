import { Component } from '@angular/core';
import { BookType } from '../../models/book-type';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/shared/layout/layout.module';

@Component({
  selector: 'library-book-type-create-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, LayoutModule ],
  templateUrl: './library-book-type-create-form.component.html'
})
export class LibraryBookTypeCreateFormComponent extends FormComponent<BookType> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { BookType } from '../../models/book-type';

@Component({
  selector: 'assoc-library-book-type-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent ],
  templateUrl: './library-book-type-form.component.html'
})
export class LibraryBookTypeFormComponent extends FormComponent<BookType> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

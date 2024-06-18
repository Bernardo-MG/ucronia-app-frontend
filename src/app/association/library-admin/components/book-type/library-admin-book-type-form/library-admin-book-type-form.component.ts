import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookType } from '@app/association/library/models/book-type';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'assoc-library-admin-book-type-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent ],
  templateUrl: './library-admin-book-type-form.component.html'
})
export class LibraryAdminBookTypeFormComponent extends FormComponent<BookType> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

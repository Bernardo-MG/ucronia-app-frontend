import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Book } from '../../models/book';

@Component({
  selector: 'assoc-library-book-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, LayoutModule, IconsModule ],
  templateUrl: './library-book-form.component.html'
})
export class LibraryBookFormComponent extends FormComponent<Book> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      language: ['']
    });
  }

  public showBookTypeSelection() {
    
  }

  public showGameSystemSelection() {

  }

}

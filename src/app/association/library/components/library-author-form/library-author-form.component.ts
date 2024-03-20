import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Author } from '../../models/author';

@Component({
  selector: 'assoc-library-author-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, LayoutModule ],
  templateUrl: './library-author-form.component.html'
})
export class LibraryAuthorFormComponent extends FormComponent<Author> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

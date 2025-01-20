import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BookType } from '@app/models/library/book-type';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';

@Component({
    selector: 'assoc-library-admin-book-type-form',
    imports: [CommonModule, FormModule, SaveControlsComponent],
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

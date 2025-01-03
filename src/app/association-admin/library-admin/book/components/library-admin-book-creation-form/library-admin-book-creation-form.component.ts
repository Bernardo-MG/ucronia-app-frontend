import { CommonModule, } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '@app/models/library/book';
import { Language } from '@app/models/library/language';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { isbnValidator } from '@app/shared/validator/isbn.validator';

@Component({
  selector: 'assoc-library-admin-book-creation-form',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, SaveControlsComponent],
  templateUrl: './library-admin-book-creation-form.component.html'
})
export class LibraryAdminBookCreationFormComponent extends FormComponent<Book> {

  @Input() public languages: Language[] = [];

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      isbn: ['', isbnValidator()],
      title: fb.group({
        supertitle: [''],
        title: ['', Validators.required],
        subtitle: ['']
      }),
      language: ['', Validators.required]
    });
  }

}

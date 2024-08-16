import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Author } from '@app/association/library/models/author';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'assoc-library-admin-author-form',
  standalone: true,
  imports: [ CommonModule, FormModule, WaitingButtonComponent ],
  templateUrl: './library-admin-author-form.component.html'
})
export class LibraryAdminAuthorFormComponent extends FormComponent<Author> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

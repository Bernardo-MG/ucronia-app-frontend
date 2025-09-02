
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Author } from '@app/domain/library/author';
import { FormComponent } from '@bernardo-mg/form';
import { JustifyBetweenDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-admin-name-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule, ButtonModule, JustifyBetweenDirective],
  templateUrl: './library-admin-name-form.html'
})
export class LibraryAdminNameFormComponent extends FormComponent<Author> {

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [],
      name: ['']
    });
  }

}

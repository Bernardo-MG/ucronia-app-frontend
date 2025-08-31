
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Publisher } from '@app/domain/library/publisher';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-admin-publisher-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule, SaveControlsComponent],
  templateUrl: './library-admin-publisher-form.component.html'
})
export class LibraryAdminPublisherFormComponent extends FormComponent<Publisher> {

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      name: ['']
    });
  }

}

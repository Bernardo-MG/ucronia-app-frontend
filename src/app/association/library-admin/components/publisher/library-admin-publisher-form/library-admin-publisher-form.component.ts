import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Publisher } from '@app/association/library/models/publisher';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'assoc-library-admin-publisher-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent ],
  templateUrl: './library-admin-publisher-form.component.html'
})
export class LibraryAdminPublisherFormComponent extends FormComponent<Publisher> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

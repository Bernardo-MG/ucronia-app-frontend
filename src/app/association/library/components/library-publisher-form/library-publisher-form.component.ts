import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Publisher } from '../../models/publisher';

@Component({
  selector: 'assoc-library-publisher-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, LayoutModule ],
  templateUrl: './library-publisher-form.component.html'
})
export class LibraryPublisherFormComponent extends FormComponent<Publisher> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

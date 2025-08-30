
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Publisher } from '@app/domain/library/publisher';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';

@Component({
  selector: 'assoc-library-admin-publisher-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-publisher-form.component.html'
})
export class LibraryAdminPublisherFormComponent extends FormComponent<Publisher> {

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

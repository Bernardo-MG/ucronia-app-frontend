import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Person } from '@app/association/library/models/person';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'assoc-library-admin-donor-form',
  standalone: true,
  imports: [CommonModule, FormModule, WaitingButtonComponent],
  templateUrl: './library-admin-donor-form.component.html'
})
export class LibraryAdminDonorFormComponent extends FormComponent<Person> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: fb.group({
        firstName: [null, Validators.required],
        lastName: ['']
      }),
    });
  }

}

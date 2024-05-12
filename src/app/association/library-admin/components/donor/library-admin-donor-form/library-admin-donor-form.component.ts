import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Donor } from '@app/association/library-admin/models/donor';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'assoc-library-admin-donor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent],
  templateUrl: './library-admin-donor-form.component.html'
})
export class LibraryAdminDonorFormComponent extends FormComponent<Donor> {

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

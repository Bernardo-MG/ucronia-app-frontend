import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Fee } from '../../models/fee';

@Component({
  selector: 'assoc-fee-edit-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LayoutModule, IconsModule],
  templateUrl: './fee-edit-form.component.html'
})
export class FeeEditFormComponent extends FormComponent<Fee> {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      date: [null, Validators.required]
    });
  }

}
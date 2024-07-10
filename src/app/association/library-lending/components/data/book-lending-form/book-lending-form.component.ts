import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '@app/association/library/models/book';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';

@Component({
  selector: 'assoc-book-lending-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent ],
  templateUrl: './book-lending-form.component.html'
})
export class BookLendingFormComponent extends FormComponent<Book>  {

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      book: ['', Validators.required],
      person: ['', Validators.required]
    });
  }

}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { BookType } from '../../models/book-type';

@Component({
  selector: 'library-game-system-edit-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './library-game-system-edit-form.component.html'
})
export class LibraryGameSystemEditFormComponent extends FormComponent<BookType> {

  @Input() public override set data(value: BookType) {
    super.data = value;
    this.bookType = value;
  }

  public bookType = new BookType();

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      name: ['']
    });
  }

}

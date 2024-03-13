import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Member } from '@app/association/members/models/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { BookType } from '../../models/book-type';

@Component({
  selector: 'library-game-system-edit-form',
  standalone: true,
  imports: [],
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

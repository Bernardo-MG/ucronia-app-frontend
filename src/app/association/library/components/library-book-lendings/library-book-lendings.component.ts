import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookLending } from '@app/models/library/book-lending';

@Component({
  selector: 'assoc-library-book-lendings',
  imports: [CommonModule],
  templateUrl: './library-book-lendings.component.html'
})
export class LibraryBookLendingsComponent {

  @Input() public lendings: BookLending[] = [];

}

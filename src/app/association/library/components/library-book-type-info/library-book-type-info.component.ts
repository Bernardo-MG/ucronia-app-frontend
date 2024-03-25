import { Component, Input } from '@angular/core';
import { BookType } from '../../models/book-type';

@Component({
  selector: 'assoc-library-book-type-info',
  standalone: true,
  imports: [],
  templateUrl: './library-book-type-info.component.html'
})
export class LibraryBookTypeInfoComponent {

  @Input() data = new BookType();

}

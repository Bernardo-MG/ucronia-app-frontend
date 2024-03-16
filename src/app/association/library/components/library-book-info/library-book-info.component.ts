import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'assoc-library-book-info',
  standalone: true,
  imports: [],
  templateUrl: './library-book-info.component.html'
})
export class LibraryBookInfoComponent {

  @Input() data = new Book();

}

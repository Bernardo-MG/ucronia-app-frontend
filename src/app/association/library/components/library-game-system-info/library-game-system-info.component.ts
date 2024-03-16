import { Component, Input } from '@angular/core';
import { BookType } from '../../models/book-type';

@Component({
  selector: 'assoc-library-game-system-info',
  standalone: true,
  imports: [],
  templateUrl: './library-game-system-info.component.html'
})
export class LibraryGameSystemInfoComponent {

  @Input() bookType = new BookType();

}

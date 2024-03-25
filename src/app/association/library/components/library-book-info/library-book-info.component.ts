import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';
import { LibraryBookAuthorsComponent } from '../library-book-authors/library-book-authors.component';

@Component({
  selector: 'assoc-library-book-info',
  standalone: true,
  imports: [CommonModule, LibraryBookAuthorsComponent],
  templateUrl: './library-book-info.component.html'
})
export class LibraryBookInfoComponent {

  @Input() data = new Book();

}

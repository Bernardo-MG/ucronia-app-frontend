import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'library-book-list',
  standalone: true,
  imports: [],
  templateUrl: './library-book-list.component.html',
  styleUrl: './library-book-list.component.sass'
})
export class LibraryBookListComponent {

  constructor(
    private service: BookService
  ) { }

}

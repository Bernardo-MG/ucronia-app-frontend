import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'library-book-list',
  standalone: true,
  imports: [],
  templateUrl: './library-book-list.component.html',
  styleUrl: './library-book-list.component.sass'
})
export class LibraryBookListComponent implements OnInit {

  public books: Book[] = [];

  /**
   * Loading flag.
   */
  public readingBooks = false;

  public currentPage = 0;

  public totalPages = 0;

  public totalMembers = 0;

  constructor(
    private service: BookService
  ) { }

  public ngOnInit(): void {
    // Load books
    this.load(0)
  }

  private load(page: number) {
    this.readingBooks = true;

    this.service.getAll(page).subscribe({
      next: response => {
        this.books = response.content;

        this.currentPage = response.page + 1;
        this.totalPages = response.totalPages;
        this.totalMembers = response.totalElements;
        // Reactivate view
        this.readingBooks = false;
      },
      error: error => {
        // Reactivate view
        this.readingBooks = false;
      }
    });
  }

}

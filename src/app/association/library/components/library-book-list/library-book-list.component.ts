import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { PaginationRequest } from '@app/core/api/models/pagination-request';

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
    this.load(undefined)
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingBooks = true;

    this.service.getAll(pagination).subscribe({
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryLendingService } from '@app/association/library-lending/services/library-lending.service';
import { Book } from '@app/association/library/models/book';
import { BookLent } from '@app/association/library/models/book-lent';
import { Person } from '@app/association/library/models/person';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { BookLendingFormComponent } from '../../data/book-lending-form/book-lending-form.component';

@Component({
  selector: 'assoc-library-lend-frontpage',
  standalone: true,
  imports: [ArticleComponent, BookLendingFormComponent],
  templateUrl: './library-lending-frontpage.component.html'
})
export class LibraryLendingFrontpageComponent extends CreateComponent<BookLent> implements OnInit {

  public memberPage = new PaginatedResponse<Person[]>([]);

  public bookPage = new PaginatedResponse<Book[]>([]);

  public readingBooks = false;

  public readingMembers = false;

  constructor(
    private lendingService: LibraryLendingService,
    rt: Router
  ) {
    super(rt);
  }

  ngOnInit(): void {
    // Load initial data
    this.onGoToBookPage(0);
    this.onGoToMemberPage(0);
  }

  public onGoToBookPage(page: number) {
    this.readingBooks = true;
    // TODO: The page correction should be done automatically
    this.lendingService.getBooks(page).subscribe({
      next: response => {
        this.bookPage = response;

        // Reactivate view
        this.readingBooks = false;
      },
      error: error => {
        // Reactivate view
        this.readingBooks = false;
      }
    });
  }

  public onGoToMemberPage(page: number) {
    this.readingMembers = true;
    // TODO: The page correction should be done automatically
    this.lendingService.getMembers(page).subscribe({
      next: response => {
        this.memberPage = response;

        // Reactivate view
        this.readingMembers = false;
      },
      error: error => {
        // Reactivate view
        this.readingMembers = false;
      }
    });
  }

  protected override save(toSave: BookLent): Observable<BookLent> {
    return this.lendingService.lend(toSave);
  }

  protected override getReturnRoute(saved: BookLent): string {
    return '/library';
  }

}

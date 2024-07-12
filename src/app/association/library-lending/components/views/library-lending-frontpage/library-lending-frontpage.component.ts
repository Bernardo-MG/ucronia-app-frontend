import { Component, OnInit } from '@angular/core';
import { LibraryLendingService } from '@app/association/library-lending/services/library-lending.service';
import { Book } from '@app/association/library/models/book';
import { BookLending } from '@app/association/library/models/book-lending';
import { BookLent } from '@app/association/library/models/book-lent';
import { Person } from '@app/association/library/models/person';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { BookLendingFormComponent } from '../../data/book-lending-form/book-lending-form.component';

@Component({
  selector: 'assoc-library-lend-frontpage',
  standalone: true,
  imports: [ArticleComponent, BookLendingFormComponent],
  templateUrl: './library-lending-frontpage.component.html'
})
export class LibraryLendingFrontpageComponent extends InfoEditorStatusComponent<BookLent> implements OnInit {

  public memberPage = new PaginatedResponse<Person[]>([]);

  public bookPage = new PaginatedResponse<Book[]>([]);

  public readingBooks = false;

  public readingMembers = false;

  constructor(
    private lendingService: LibraryLendingService,
    private authContainer: AuthContainer
  ) {
    super(new BookLent());
  }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("library_lending", "update");
    this.deletable = this.authContainer.hasPermission("library_lending", "delete");

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

  protected override delete(): void {
    throw new Error('Method not implemented.');
  }

  protected override read(): Observable<BookLent> {
    throw new Error('Method not implemented.');
  }

  protected override save(toSave: BookLent): Observable<BookLent> {
    return this.lendingService.lend(toSave);
  }

}

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfo } from '@app/models/library/book-info';
import { BookReturned } from '@app/models/library/book-returned';
import { Borrower } from '@app/models/library/borrower';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ArticleComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { Observable } from 'rxjs';
import { LibraryAdminBookReturnFormComponent } from '../../components/library-admin-book-return-form/library-admin-book-return-form.component';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-book-lending-returning',
  imports: [ArticleComponent, LibraryAdminBookReturnFormComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-book-lending-returning.container.html'
})
export class LibraryAdminBookLendingReturnContainer extends CreateComponent<BookReturned> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(BookAdminService);

  public source: 'games' | 'fiction' = 'games';

  public book = new BookInfo();

  private index = -1;

  public readonly createPermission;

  public borrower = new Borrower();

  constructor(
    authContainer: AuthContainer
  ) {
    super();
    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('number');
      if (indexParam) {
        this.index = Number(indexParam);
      }

      const urlSegments = this.route.snapshot.url;
      const sourceSegment = urlSegments.length > 0 ? urlSegments[0].path : '';
      this.source = sourceSegment as 'games' | 'fiction';

      this.load();
    });
    // Check permissions
    this.createPermission = authContainer.hasPermission("library_lending", "create");
  }

  public onSaved() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private load() {
    if (this.source === 'games') {
      this.service.getOneGameBook(this.index).subscribe({
        next: response => {
          this.book = response;
          this.borrower = this.book.lendings[this.book.lendings.length - 1].borrower;
        },
        error: error => {
        }
      });
    } else {
      this.service.getOneFictionBook(this.index).subscribe({
        next: response => {
          this.book = response;
          this.borrower = this.book.lendings[this.book.lendings.length - 1].borrower;
        },
        error: error => {
        }
      });
    }
  }

  protected override save(toSave: BookReturned): Observable<BookReturned> {
    return this.service.return(toSave);
  }

  protected override handleSaveSuccess(saved: BookReturned) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}

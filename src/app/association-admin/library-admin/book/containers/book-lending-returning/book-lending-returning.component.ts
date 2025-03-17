import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAdminService } from '@app/association-admin/library-admin/book/services/book-admin.service';
import { Book } from '@app/models/library/book';
import { BookReturned } from '@app/models/library/book-returned';
import { Borrower } from '@app/models/library/borrower';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ArticleComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { BookReturnFormComponent } from '../../components/book-return-form/book-return-form.component';
import { LibraryLendingService } from '../../services/library-lending.service';

@Component({
  selector: 'assoc-book-lending-returning',
  imports: [ArticleComponent, BookReturnFormComponent, ResponsiveShortColumnsDirective],
  templateUrl: './book-lending-returning.component.html'
})
export class BookLendingReturnContainer extends CreateComponent<BookReturned> implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private bookService = inject(BookAdminService);

  private service = inject(LibraryLendingService);

  private authContainer = inject(AuthContainer);

  public book = new Book();

  private index = -1;

  public createPermission = false;

  public borrower = new Borrower();

  public ngOnInit(): void {
    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('number');
      if (indexParam) {
        this.index = Number(indexParam);
      }
      this.load();
    });
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_lending", "create");
  }

  public onSaved() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private load() {
    this.bookService.getOne(this.index).subscribe({
      next: response => {
        this.book = response;
        this.borrower = this.book.lendings[this.book.lendings.length - 1].borrower;
      },
      error: error => {
      }
    });
  }

  protected override save(toSave: BookReturned): Observable<BookReturned> {
    return this.service.return(toSave);
  }

  protected override handleSaveSuccess(saved: BookReturned) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}

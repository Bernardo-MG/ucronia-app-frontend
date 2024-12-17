import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAdminService } from '@app/association-admin/library-admin/book/services/book-admin.service';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Book } from '@app/models/library/book';
import { BookReturned } from '@app/models/library/book-returned';
import { Borrower } from '@app/models/library/borrower';
import { Person } from '@app/models/person/person';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { BookReturnFormComponent } from '../../components/book-return-form/book-return-form.component';
import { LibraryLendingService } from '../../services/library-lending.service';

@Component({
  selector: 'assoc-book-lending-returning',
  standalone: true,
  imports: [ArticleComponent, BookReturnFormComponent, ResponsiveShortColumnsDirective],
  templateUrl: './book-lending-returning.component.html'
})
export class BookLendingReturnComponent extends CreateComponent<BookReturned> implements OnInit, OnChanges {

  public book = new Book();

  private index = -1;

  public createPermission = false;

  public borrower = new Borrower();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookAdminService,
    private service: LibraryLendingService,
    private authContainer: AuthContainer
  ) {
    super();
  }

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
      },
      error: error => {
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['book']) {
      if (this.book.lendings.length > 0) {
        this.borrower = this.book.lendings[this.book.lendings.length - 1].borrower;
      } else {
        this.borrower = new Person();
      }
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

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookReturned } from '@app/models/library/book-returned';
import { Borrower } from '@app/models/library/borrower';
import { GameBook } from '@app/models/library/game-book';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ArticleComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminBookReturnFormComponent } from '../../../shared/components/library-admin-book-return-form/library-admin-book-return-form.component';
import { GameBookAdminService } from '../../services/game-book-admin.service';

@Component({
  selector: 'assoc-library-admin-game-book-lending-returning',
  imports: [ArticleComponent, LibraryAdminBookReturnFormComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-game-book-lending-returning.container.html'
})
export class LibraryAdminGameBookLendingReturnContainer extends CreateComponent<BookReturned> {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private service = inject(GameBookAdminService);

  private authContainer = inject(AuthContainer);

  public book = new GameBook();

  private index = -1;

  public readonly createPermission;

  public borrower = new Borrower();

  constructor() {
    super();
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
    this.service.getOne(this.index).subscribe({
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

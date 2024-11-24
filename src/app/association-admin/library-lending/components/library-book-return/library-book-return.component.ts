import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookReturnFormComponent } from '@app/association-admin/library-lending/components/book-return-form/book-return-form.component';
import { LibraryLendingService } from '@app/association-admin/library-lending/services/library-lending.service';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Book } from '@app/models/library/book';
import { BookReturned } from '@app/models/library/book-returned';
import { Borrower } from '@app/models/library/borrower';
import { Person } from '@app/models/person/person';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'assoc-library-book-return',
  standalone: true,
  imports: [CommonModule, IconsModule, BookReturnFormComponent],
  templateUrl: './library-book-return.component.html'
})
export class LibraryBookReturnComponent extends CreateComponent<BookReturned> implements OnInit, OnChanges {

  @Input() public book = new Book();

  @Output() public saved = new EventEmitter<void>();

  public createPermission = false;

  public borrower = new Borrower();

  constructor(
    private service: LibraryLendingService,
    private authContainer: AuthContainer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_lending", "create");
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
    this.saved.emit();
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}

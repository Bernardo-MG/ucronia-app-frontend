import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookLendingMemberSelectionComponent } from '@app/association/library-lending/core/components/book-lending-member-selection/book-lending-member-selection.component';
import { BookReturnFormComponent } from '@app/association/library-lending/core/components/book-return-form/book-return-form.component';
import { LibraryLendingService } from '@app/association/library-lending/core/services/library-lending.service';
import { MemberStatusSelectComponent } from '@app/association/public-members/shared/components/member-status-select/member-status-select.component';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Book } from '@app/models/library/book';
import { BookReturned } from '@app/models/library/book-returned';
import { Person } from '@app/models/person/person';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'assoc-library-book-return',
  standalone: true,
  imports: [CommonModule, IconsModule, BookLendingMemberSelectionComponent, MemberStatusSelectComponent, BookReturnFormComponent, BlockUiDirective],
  templateUrl: './library-book-return.component.html'
})
export class LibraryBookReturnComponent extends CreateComponent<BookReturned> implements OnInit, OnChanges {

  @Input() public book = new Book();

  @Output() public saved = new EventEmitter<void>();

  public createPermission = false;

  public person = new Person();

  constructor(
    private service: LibraryLendingService,
    private authContainer: AuthContainer,
    rtr: Router,
    rt: ActivatedRoute
  ) {
    super(rtr, rt);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_lending", "create");
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['book']) {
      if (this.book.lendings.length > 0) {
        this.person = this.book.lendings[this.book.lendings.length - 1].person;
      } else {
        this.person = new Person();
      }
    }
  }

  protected override save(toSave: BookReturned): Observable<BookReturned> {
    return this.service.return(toSave);
  }

  protected override getReturnRoute(saved: BookReturned): string {
    return '';
  }

  protected override handleSaveSuccess(response: BookReturned) {
    super.handleSaveSuccess(response);
    this.saved.emit();
  }

}

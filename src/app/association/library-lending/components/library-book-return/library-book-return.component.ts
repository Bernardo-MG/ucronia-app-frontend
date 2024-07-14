import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryLendingService } from '@app/association/library-lending/services/library-lending.service';
import { Book } from '@app/association/library/models/book';
import { BookReturned } from '@app/association/library/models/book-returned';
import { Person } from '@app/association/library/models/person';
import { MemberStatusSelectComponent } from '@app/association/members/components/select/member-status-select/member-status-select.component';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { Observable } from 'rxjs';
import { BookLendingMemberSelectionComponent } from '../book-lending-member-selection/book-lending-member-selection.component';
import { BookReturnFormComponent } from '../data/book-return-form/book-return-form.component';

@Component({
  selector: 'assoc-library-book-return',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingOverlayComponent, BookLendingMemberSelectionComponent, MemberStatusSelectComponent, BookReturnFormComponent],
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
    rt: Router
  ) {
    super(rt);
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

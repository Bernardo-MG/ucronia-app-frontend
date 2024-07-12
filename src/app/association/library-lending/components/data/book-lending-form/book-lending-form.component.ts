import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminBookSelectionComponent } from '@app/association/library-admin/components/book/library-admin-book-selection/library-admin-book-selection.component';
import { Book } from '@app/association/library/models/book';
import { BookLent } from '@app/association/library/models/book-lent';
import { Person } from '@app/association/library/models/person';
import { Member } from '@app/association/members/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { BookLendingMemberSelectionComponent } from '../../book-lending-member-selection/book-lending-member-selection.component';

@Component({
  selector: 'assoc-book-lending-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule, WaitingButtonComponent, BookLendingMemberSelectionComponent, LibraryAdminBookSelectionComponent],
  templateUrl: './book-lending-form.component.html'
})
export class BookLendingFormComponent extends FormComponent<BookLent> {

  @Input() public member = new Member();

  @Output() public goToPersonPage = new EventEmitter<number>();

  @Output() public goToBookPage = new EventEmitter<number>();

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      lendingDate: [null, Validators.required],
      person: [-1, Validators.required],
      book: [-1, Validators.required]
    });
  }

  public onGoToBookPage(page: number) {
    this.goToBookPage.emit(page);
  }

  public onGoToPersonPage(page: number) {
    this.goToPersonPage.emit(page);
  }

}

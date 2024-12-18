import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LibraryAdminBookSelectionComponent } from '@app/association-admin/library-admin/components/book/library-admin-book-selection/library-admin-book-selection.component';
import { Book } from '@app/models/library/book';
import { BookLent } from '@app/models/library/book-lent';
import { Member } from '@app/models/members/member';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { BookLendingMemberSelectionComponent } from '../book-lending-member-selection/book-lending-member-selection.component';

@Component({
  selector: 'assoc-book-lending-form',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, WaitingButtonComponent, BookLendingMemberSelectionComponent, LibraryAdminBookSelectionComponent],
  templateUrl: './book-lending-form.component.html'
})
export class BookLendingFormComponent extends FormComponent<BookLent> implements OnChanges {

  @Input() public member = new Member();

  @Input() public book = new Book();

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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['member']) {
      this.form.get('person')?.setValue(this.member.number);
    }
    if (changes['book']) {
      this.form.get('book')?.setValue(this.book.number);
    }
  }

  public onGoToBookPage(page: number) {
    this.goToBookPage.emit(page);
  }

  public onGoToPersonPage(page: number) {
    this.goToPersonPage.emit(page);
  }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LibraryAdminBookSelectionComponent } from '@app/association-admin/library-admin/components/book/library-admin-book-selection/library-admin-book-selection.component';
import { Book } from '@app/association/library/models/book';
import { BookReturned } from '@app/association/library/models/book-returned';
import { Person } from '@app/association/library/models/person';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { FormModule } from '@app/shared/form/form.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { BookLendingMemberSelectionComponent } from '../book-lending-member-selection/book-lending-member-selection.component';

@Component({
  selector: 'assoc-book-return-form',
  standalone: true,
  imports: [CommonModule, FormModule, WaitingButtonComponent, BookLendingMemberSelectionComponent, LibraryAdminBookSelectionComponent],
  templateUrl: './book-return-form.component.html'
})
export class BookReturnFormComponent extends FormComponent<BookReturned> implements OnChanges {

  @Input() public person = new Person();

  @Input() public book = new Book();

  @Output() public goToPersonPage = new EventEmitter<number>();

  @Output() public goToBookPage = new EventEmitter<number>();

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      returnDate: [null, Validators.required],
      person: [-1, Validators.required],
      book: [-1, Validators.required]
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['person']) {
      this.form.get('person')?.setValue(this.person.number);
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

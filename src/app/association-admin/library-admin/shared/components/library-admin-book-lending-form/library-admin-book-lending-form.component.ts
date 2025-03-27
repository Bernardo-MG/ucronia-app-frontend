import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '@app/models/library/book';
import { BookLent } from '@app/models/library/book-lent';
import { Member } from '@app/models/members/member';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective } from '@bernardo-mg/form';
import { WaitingButtonComponent } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-library-admin-book-lending-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-book-lending-form.component.html'
})
export class LibraryAdminBookLendingFormComponent extends FormComponent<BookLent> implements OnChanges {

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

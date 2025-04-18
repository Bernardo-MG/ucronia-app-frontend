import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookReturned } from '@app/models/library/book-returned';
import { Member } from '@app/models/members/member';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective } from '@bernardo-mg/form';
import { WaitingDirective } from '@bernardo-mg/layout';
import { BookInfo } from '../../../../../models/library/book-info';

@Component({
  selector: 'assoc-library-admin-book-return-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputFailureFeedbackComponent, WaitingDirective, InvalidFieldDirective],
  templateUrl: './library-admin-book-return-form.component.html'
})
export class LibraryAdminBookReturnFormComponent extends FormComponent<BookReturned> {

  @Input() public set borrower(value: Member) {
    this.form.get('borrower')?.setValue(value.number);
    this.memberName = value.name.fullName;
  }

  @Input() public set book(value: BookInfo) {
    this.form.get('book')?.setValue(value.number);
  }

  @Output() public goToPersonPage = new EventEmitter<number>();

  @Output() public goToBookPage = new EventEmitter<number>();

  public today = new Date().toISOString().split('T')[0];

  public memberName = '';

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      returnDate: [null, Validators.required],
      borrower: [-1, Validators.required],
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

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookReturned } from '@app/models/library/book-returned';
import { Borrower } from '@app/models/library/borrower';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective } from '@bernardo-mg/form';
import { WaitingButtonComponent } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-library-admin-book-return-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitingButtonComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-book-return-form.component.html'
})
export class LibraryAdminBookReturnFormComponent extends FormComponent<BookReturned> implements OnChanges {

  @Input() public borrower = new Borrower();

  @Input() public book = -1;

  @Output() public goToPersonPage = new EventEmitter<number>();

  @Output() public goToBookPage = new EventEmitter<number>();

  public today = new Date().toISOString().split('T')[0];

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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['borrower']) {
      this.form.get('borrower')?.setValue(this.borrower.number);
    }
    if (changes['book']) {
      this.form.get('book')?.setValue(this.book);
    }
  }

  public onGoToBookPage(page: number) {
    this.goToBookPage.emit(page);
  }

  public onGoToPersonPage(page: number) {
    this.goToPersonPage.emit(page);
  }

}

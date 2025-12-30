
import { Component, Input, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fee } from "@ucronia/domain";
import { BookInfo } from "@ucronia/domain";
import { Borrower } from "@ucronia/domain";
import { BookReturned } from "@ucronia/domain";
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-book-return-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule],
  templateUrl: './library-book-return-form.html'
})
export class LibraryBookReturnForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set borrower(value: Borrower) {
    this.form.get('borrower')?.setValue(value.number);
    this.memberName = value.name.fullName;
  }

  @Input() public set book(value: BookInfo) {
    this.form.get('book')?.setValue(value.number);
    this.lentDate = value.lendings[value.lendings.length - 1].lendingDate;
  }

  public readonly save = output<BookReturned>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public fee = new Fee();

  public memberName = '';

  public lentDate = new Date();
  public readonly today = new Date();

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      returnDate: [null, Validators.required],
      borrower: [-1, Validators.required],
      book: [-1, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}

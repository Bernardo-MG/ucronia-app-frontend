
import { Component, Input, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookInfo } from '@app/domain/library/book-info';
import { BookLent } from '@app/domain/library/book-lent';
import { Member } from '@app/domain/members/member';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-book-lending-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, ButtonModule],
  templateUrl: './library-book-lending-form.html'
})
export class LibraryBookLendingForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: BookLent) {
    this.form.patchValue(value as any);
  }

  @Input() public set borrower(value: Member) {
    this.form.get('borrower')?.setValue(value.number);
    this.memberName = value.name.fullName;
  }

  @Input() public set book(value: BookInfo) {
    this.form.get('book')?.setValue(value.number);
  }

  public readonly save = output<BookLent>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public readonly goToPersonPage = output<number>();

  public readonly goToBookPage = output<number>();

  public today = new Date().toISOString().split('T')[0];

  public memberName = '';

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      lendingDate: [null, Validators.required],
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

  public onGoToBookPage(page: number) {
    this.goToBookPage.emit(page);
  }

  public onGoToPersonPage(page: number) {
    this.goToPersonPage.emit(page);
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

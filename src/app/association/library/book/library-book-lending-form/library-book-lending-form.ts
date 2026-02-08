
import { Component, Input, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { BookLent, Member } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-book-lending-form',
  imports: [FormsModule, ReactiveFormsModule, FloatLabelModule, DatePickerModule, MessageModule, ButtonModule],
  templateUrl: './library-book-lending-form.html'
})
export class LibraryBookLendingForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  public readonly save = output<BookLent>();

  public readonly today = new Date();

  @Input() public set borrower(value: Member) {
    this.form.get('borrower')?.setValue(value.number);
    this.memberName = value.name.fullName;
  }

  @Input() public set book(value: number) {
    this.form.get('book')?.setValue(value);
  }

  public formStatus: FormStatus;

  public form: FormGroup;

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

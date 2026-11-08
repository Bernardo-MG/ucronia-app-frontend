import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Profile } from '@ucronia/domain';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-book-lending-form',
  imports: [ReactiveFormsModule, DatePickerModule, MessageModule, MemberSearch],
  templateUrl: './library-book-lending-form.html'
})
export class LibraryBookLendingForm implements OnChanges {

  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly failures = input(new FailureStore());
  public readonly members = input<Profile[]>([]);

  public readonly save = output<BookLendingEvent>();
  public readonly searchMember = output<MemberSearchEvent>();

  public readonly today = new Date();

  @Input() public borrower: Profile | undefined;
  @Input() public book = -1;

  public readonly formStatus: FormStatus;

  public readonly form: FormGroup;

  public memberName = '';

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      lendingDate: [null, Validators.required],
      borrower: [-1, Validators.required],
      book: [-1, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const borrower = this.borrower && this.borrower.number > 0 ? this.borrower.number : null;
    if (changes['book']) {
      this.form.reset({ book: this.book, borrower, lendingDate: null });
    } else if (changes['borrower']) {
      this.form.get('borrower')?.setValue(borrower);
    }
    if (changes['book'] || changes['borrower']) {
      this.memberName = this.borrower?.name.fullName ?? '';
    }
  }

  /**
   * Handler for the save event.
   */
  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

  public onClearMember(): void {
    this.memberName = '';
    this.form.get('borrower')?.reset();
    this.form.get('borrower')?.markAsDirty();
  }

  public onSelectMember(member: Profile) {
    if (!member) {
      return;
    }

    this.form.get('borrower')?.setValue(member.number);
  }

}

export class BookLendingEvent {
  constructor(
    public lendingDate: Date,
    public borrower: number,
    public book: number
  ) { }
}

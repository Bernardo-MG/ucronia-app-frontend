import { Component, Input, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Profile } from '@ucronia/domain';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-book-lending-form',
  imports: [DrawerFormActions, ReactiveFormsModule, DatePickerModule, MessageModule, MemberSearch],
  templateUrl: './library-book-lending-form.html'
})
export class LibraryBookLendingForm implements OnChanges {

  public readonly cancelEdition = output<void>();

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly members = input<Profile[]>([]);

  public readonly save = output<BookLendingEvent>();
  public readonly searchMember = output<MemberSearchEvent>();

  public readonly today = new Date();

  @Input() public set borrower(value: Profile) {
    this.form.get('borrower')?.setValue(value.number);
    this.memberName = value.name.fullName;
  }

  @Input() public set book(value: number) {
    this.form.get('book')?.setValue(value);
  }

  public formStatus: FormStatus;

  public form: FormGroup;

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

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
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

import { Component, Input, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Fee } from '@ucronia/domain';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-book-return-form',
  imports: [DrawerFormActions, ReactiveFormsModule, InputTextModule, DatePickerModule, MessageModule],
  templateUrl: './library-book-return-form.html'
})
export class LibraryBookReturnForm {

  public readonly cancelEdition = output<void>();

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly lentDate = input(new Date());
  public readonly failures = input(new FailureStore());
  public readonly borrowerName = input('');

  @Input() public set borrower(value: number) {
    this.form.get('borrower')?.setValue(value);
  }

  @Input() public set book(value: number) {
    this.form.get('book')?.setValue(value);
  }

  public readonly save = output<BookReturnedEvent>();

  public readonly formStatus: FormStatus;

  public readonly form: FormGroup;

  public readonly fee = new Fee();

  public readonly memberName = '';

  public readonly today = new Date();

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      returnDate: [null, Validators.required],
      borrower: [-1, Validators.required],
      book: [-1, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
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

}

export class BookReturnedEvent {
  constructor(
    public returnDate: Date,
    public borrower: number,
    public book: number
  ) { }
}

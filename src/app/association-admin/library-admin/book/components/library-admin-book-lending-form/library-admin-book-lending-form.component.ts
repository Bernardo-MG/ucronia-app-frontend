
import { Component, Input, inject, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookInfo } from '@app/domain/library/book-info';
import { BookLent } from '@app/domain/library/book-lent';
import { Member } from '@app/domain/members/member';
import { FormComponent } from '@bernardo-mg/form';
import { WaitingDirective } from '@bernardo-mg/ui';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-admin-book-lending-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, WaitingDirective],
  templateUrl: './library-admin-book-lending-form.component.html'
})
export class LibraryAdminBookLendingFormComponent extends FormComponent<BookLent> {

  @Input() public set borrower(value: Member) {
    this.form.get('person')?.setValue(value.number);
    this.memberName = value.name.fullName;
  }

  @Input() public set book(value: BookInfo) {
    this.form.get('book')?.setValue(value.number);
  }

  public readonly goToPersonPage = output<number>();

  public readonly goToBookPage = output<number>();

  public today = new Date().toISOString().split('T')[0];

  public memberName = '';

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      lendingDate: [null, Validators.required],
      person: [-1, Validators.required],
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

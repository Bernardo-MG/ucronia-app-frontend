import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminBookSelectionComponent } from '@app/association/library-admin/components/book/library-admin-book-selection/library-admin-book-selection.component';
import { Book } from '@app/association/library/models/book';
import { BookLent } from '@app/association/library/models/book-lent';
import { Person } from '@app/association/library/models/person';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { BookLendingMemberSelectionComponent } from '../../book-lending-member-selection/book-lending-member-selection.component';

@Component({
  selector: 'assoc-book-lending-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule, WaitingButtonComponent, BookLendingMemberSelectionComponent, LibraryAdminBookSelectionComponent],
  templateUrl: './book-lending-form.component.html'
})
export class BookLendingFormComponent extends FormComponent<BookLent> {

  @Input() public personPage = new PaginatedResponse<Person[]>([]);

  @Input() public bookPage = new PaginatedResponse<Book[]>([]);

  @Output() public goToPersonPage = new EventEmitter<number>();

  @Output() public goToBookPage = new EventEmitter<number>();

  @ViewChild('pickCloseButton') pickCloseButton: any;

  public get book(): number {
    return this.form.get('book')?.value;
  }

  public set book(data: number) {
    this.form.get('book')?.setValue(data);
  }

  public get person(): number {
    return this.form.get('person')?.value;
  }

  public set person(data: number) {
    this.form.get('person')?.setValue(data);
  }

  public bookName = '';

  public personName = '';

  public selector = '';

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

  public onShowBookSelection() {
    this.selector = 'book';
  }

  public onShowPersonSelection() {
    this.selector = 'person';
  }

  public onSelectBook(book: Book) {
    this.bookName = book.title;
    this.book = book.number;
    this.pickCloseButton.nativeElement.click();
  }

  public onSelectPerson(person: Person) {
    this.personName = person.name.fullName;
    this.person = person.number;
    this.pickCloseButton.nativeElement.click();
  }

  public onGoToBookPage(page: number) {
    this.goToBookPage.emit(page);
  }

  public onGoToPersonPage(page: number) {
    this.goToPersonPage.emit(page);
  }

}

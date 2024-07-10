import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '@app/association/library/models/book';
import { Person } from '@app/association/library/models/person';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { BookLendingPersonSelectionComponent } from '../../book-lending-person-selection/book-lending-person-selection.component';

@Component({
  selector: 'assoc-book-lending-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IconsModule, WaitingButtonComponent, BookLendingPersonSelectionComponent ],
  templateUrl: './book-lending-form.component.html'
})
export class BookLendingFormComponent extends FormComponent<Book>  {

  @Input() public personPage = new PaginatedResponse<Person[]>([]);

  @Output() public goToPersonPage = new EventEmitter<number>();

  @ViewChild('pickCloseButton') pickCloseButton: any;

  public selector = '';

  public book = '';

  public person = '';

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      book: ['', Validators.required],
      person: ['', Validators.required]
    });
  }

  public onShowBookSelection() {
    this.selector = 'book';
  }

  public onShowPersonSelection() {
    this.selector = 'person';
  }

  public onSelectPerson(person: Person) {
    this.person = person.name.fullName;
    this.pickCloseButton.nativeElement.click();
  }

  public onGoToPersonPage(page: number) {
    this.goToPersonPage.emit(page);
  }

}

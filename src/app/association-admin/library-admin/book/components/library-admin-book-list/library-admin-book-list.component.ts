import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '@app/models/library/book';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-library-admin-book-list',
  imports: [CommonModule, RouterModule, SortingButtonComponent, IconSuccessOrFailureComponent],
  templateUrl: './library-admin-book-list.component.html'
})
export class LibraryAdminBookListComponent {

  @Input() public books: Book[] = [];

  @Input() public routeLinkAdapter: (data: Book) => string = (data) => '';

  @Output() public directionChange = new EventEmitter<SortingProperty>();

}

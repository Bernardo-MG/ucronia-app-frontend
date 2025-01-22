import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Book } from '@app/models/library/book';
import { IconSuccessOrFailureComponent } from '@app/shared/icons/components/icon-success-or-failure/icon-success-or-failure.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
    selector: 'assoc-library-book-list',
    imports: [CommonModule, RouterModule, SortingButtonComponent, IconSuccessOrFailureComponent],
    templateUrl: './library-book-list.component.html'
})
export class LibraryBookListComponent {

  @Input() books: Book[] = [];

  @Input() public routeLinkAdapter: (data: Book) => string = (data) => '';

  @Output() public directionChange = new EventEmitter<SortProperty>();

}

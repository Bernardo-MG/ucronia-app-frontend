import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Book } from '@app/models/library/book';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'assoc-library-admin-book-list',
    imports: [CommonModule, RouterModule, SortingButtonComponent, IconSuccessOrFailureComponent],
    templateUrl: './library-admin-book-list.component.html'
})
export class LibraryAdminBookListComponent {

  @Input() books: Book[] = [];

  @Input() public routeLinkAdapter: (data: Book) => string = (data) => '';

  @Output() public directionChange = new EventEmitter<SortProperty>();

}

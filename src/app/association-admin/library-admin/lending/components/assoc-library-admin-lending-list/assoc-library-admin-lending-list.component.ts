import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookLending } from '@app/models/library/book-lending';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-library-admin-lending-list',
  imports: [CommonModule, RouterModule, SortingButtonComponent],
  templateUrl: './assoc-library-admin-lending-list.component.html'
})
export class AssocLibraryAdminLendingListComponent {

  @Input() public lendings: BookLending[] = [];

  @Input() public routeLinkAdapter: (data: BookLending) => string = (data) => '';

  @Output() public directionChange = new EventEmitter<SortingProperty>();

}

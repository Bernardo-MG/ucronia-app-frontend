
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookLending } from '@app/models/library/book-lending';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-library-admin-lending-list',
  imports: [RouterModule, SortingButtonComponent],
  templateUrl: './assoc-library-admin-lending-list.component.html'
})
export class AssocLibraryAdminLendingListComponent {

  public readonly lendings = input<BookLending[]>([]);

  @Output() public directionChange = new EventEmitter<SortingProperty>();

}

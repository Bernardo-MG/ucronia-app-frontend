
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { SortingProperty } from '@bernardo-mg/request';
import { BookInfo } from '../../../../../models/library/book-info';

@Component({
  selector: 'assoc-library-admin-book-list',
  imports: [RouterModule, SortingButtonComponent, IconSuccessOrFailureComponent],
  templateUrl: './library-admin-book-list.component.html'
})
export class LibraryAdminBookListComponent {

  public readonly books = input<BookInfo[]>([]);

  public readonly routeLinkAdapter = input<(data: BookInfo) => string>((data) => '');

  public readonly directionChange = output<SortingProperty>();

}

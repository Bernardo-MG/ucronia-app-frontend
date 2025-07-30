
import { Component, Input, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookInfo } from '@app/models/library/book-info';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-library-book-list',
  imports: [RouterModule, SortingButtonComponent, IconSuccessOrFailureComponent],
  templateUrl: './library-book-list.component.html'
})
export class LibraryBookListComponent {

  @Input() public books: BookInfo[] = [];

  public readonly routeLinkAdapter = input<(data: BookInfo) => string>((data) => '');

  public readonly directionChange = output<SortingProperty>();

}

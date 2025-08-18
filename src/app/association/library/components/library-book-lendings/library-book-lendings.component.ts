
import { Component, Input } from '@angular/core';
import { BookLending } from '@app/domain/library/book-lending';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'assoc-library-book-lendings',
  imports: [TableModule],
  templateUrl: './library-book-lendings.component.html'
})
export class LibraryBookLendingsComponent {

  @Input() public lendings: BookLending[] = [];

}

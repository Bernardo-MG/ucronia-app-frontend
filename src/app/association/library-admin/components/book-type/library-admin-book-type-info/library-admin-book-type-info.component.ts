import { Component, Input } from '@angular/core';
import { BookType } from '@app/association/library-admin/models/book-type';

@Component({
  selector: 'assoc-library-admin-book-type-info',
  standalone: true,
  imports: [],
  templateUrl: './library-admin-book-type-info.component.html'
})
export class LibraryAdminBookTypeInfoComponent {

  @Input() data = new BookType();

}

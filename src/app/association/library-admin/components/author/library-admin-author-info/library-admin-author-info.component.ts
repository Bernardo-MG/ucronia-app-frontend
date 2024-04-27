import { Component, Input } from '@angular/core';
import { Author } from '../../../models/author';

@Component({
  selector: 'assoc-library-admin-author-info',
  standalone: true,
  imports: [],
  templateUrl: './library-admin-author-info.component.html'
})
export class LibraryAdminAuthorInfoComponent {

  @Input() data = new Author();

}

import { Component, Input } from '@angular/core';
import { Author } from '../../models/author';

@Component({
  selector: 'assoc-library-author-list',
  standalone: true,
  imports: [],
  templateUrl: './library-author-list.component.html'
})
export class LibraryAuthorListComponent {

  @Input() data = new Author();

}

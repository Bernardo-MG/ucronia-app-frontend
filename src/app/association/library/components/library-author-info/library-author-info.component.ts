import { Component, Input } from '@angular/core';
import { Author } from '../../models/author';

@Component({
  selector: 'assoc-library-author-info',
  standalone: true,
  imports: [],
  templateUrl: './library-author-info.component.html'
})
export class LibraryAuthorInfoComponent {

  @Input() data = new Author();

}

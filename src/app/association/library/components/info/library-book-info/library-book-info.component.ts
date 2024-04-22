import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '../../../models/book';

@Component({
  selector: 'assoc-library-book-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-book-info.component.html'
})
export class LibraryBookInfoComponent {

  @Input() data = new Book();

}

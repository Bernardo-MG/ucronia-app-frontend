import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '../../../models/book';

@Component({
  selector: 'assoc-library-admin-book-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-admin-book-info.component.html'
})
export class LibraryAdminBookInfoComponent {

  @Input() data = new Book();

}

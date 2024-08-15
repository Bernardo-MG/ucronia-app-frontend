import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '@app/association/library/models/book';
import { SortProperty } from '@app/core/api/models/sort-field';
import { IconsModule } from '@app/shared/icons/icons.module';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
  selector: 'assoc-library-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SortingButtonComponent, IconsModule],
  templateUrl: './library-book-list.component.html'
})
export class LibraryBookListComponent {

  @Input() books: Book[] = [];

  @Output() public directionChange = new EventEmitter<SortProperty>();

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookType } from '@app/models/library/book-type';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-library-admin-book-type-info',
  imports: [CommonModule, PlaceholderDirective, ControlButtonsComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent],
  templateUrl: './library-admin-book-type-info.component.html'
})
export class LibraryAdminBookTypeInfoComponent {

  @Input() public data = new BookType();

  @Input() public waiting = false;

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}

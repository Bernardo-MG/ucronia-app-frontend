import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookType } from '@app/models/library/book-type';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, PlaceholderDirective } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-library-admin-game-system-info',
  imports: [CommonModule, CardComponent, CardBodyComponent, PlaceholderDirective, ControlButtonsComponent, CardHeaderComponent, CardFooterComponent],
  templateUrl: './library-admin-game-system-info.component.html'
})
export class LibraryAdminGameSystemInfoComponent {

  @Input() public data = new BookType();

  @Input() public waiting = false;

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}

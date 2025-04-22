import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '@app/models/library/author';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-library-admin-author-info',
  imports: [CommonModule, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, PlaceholderDirective, ControlButtonsComponent],
  templateUrl: './library-admin-author-info.component.html'
})
export class LibraryAdminAuthorInfoComponent {

  @Input() public data = new Author();

  @Input() public waiting = false;

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}

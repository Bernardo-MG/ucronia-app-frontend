import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookType } from '@app/models/library/book-type';
import { CardModule } from '@app/shared/card/card.module';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
    selector: 'assoc-library-admin-book-type-info',
    imports: [CommonModule, CardModule, PlaceholderDirective, ControlButtonsComponent],
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

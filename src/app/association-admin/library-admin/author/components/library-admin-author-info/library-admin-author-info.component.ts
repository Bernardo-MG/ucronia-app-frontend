import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '@app/models/library/author';
import { CardModule } from '@app/shared/card/card.module';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
    selector: 'assoc-library-admin-author-info',
    imports: [CommonModule, CardModule, PlaceholderDirective, ControlButtonsComponent],
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

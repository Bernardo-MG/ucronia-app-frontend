
import { Component, EventEmitter, Output, input } from '@angular/core';
import { BookType } from '@app/models/library/book-type';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { PlaceholderDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'assoc-library-admin-game-system-info',
  imports: [CardModule, ControlButtonsComponent, PlaceholderDirective],
  templateUrl: './library-admin-game-system-info.component.html'
})
export class LibraryAdminGameSystemInfoComponent {

  public readonly data = input(new BookType());

  public readonly waiting = input(false);

  public readonly showMenu = input(false);

  public readonly deletable = input(false);

  public readonly editable = input(false);

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}


import { Component, input, output } from '@angular/core';
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

  public readonly delete = output<void>();

  public readonly startEditing = output<void>();

}

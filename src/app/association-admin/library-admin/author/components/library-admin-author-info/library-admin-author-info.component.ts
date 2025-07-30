
import { Component, EventEmitter, Output, input } from '@angular/core';
import { Author } from '@app/models/library/author';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { PlaceholderDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'assoc-library-admin-author-info',
  imports: [CardModule, PlaceholderDirective, ControlButtonsComponent],
  templateUrl: './library-admin-author-info.component.html'
})
export class LibraryAdminAuthorInfoComponent {

  public readonly data = input(new Author());

  public readonly waiting = input(false);

  public readonly showMenu = input(false);

  public readonly deletable = input(false);

  public readonly editable = input(false);

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}


import { Component, EventEmitter, Output, input } from '@angular/core';
import { Publisher } from '@app/models/library/publisher';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { PlaceholderDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'assoc-library-admin-publisher-info',
  imports: [CardModule, PlaceholderDirective, ControlButtonsComponent],
  templateUrl: './library-admin-publisher-info.component.html'
})
export class LibraryAdminPublisherInfoComponent {

  public readonly data = input(new Publisher());

  public readonly waiting = input(false);

  public readonly showMenu = input(false);

  public readonly deletable = input(false);

  public readonly editable = input(false);

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}

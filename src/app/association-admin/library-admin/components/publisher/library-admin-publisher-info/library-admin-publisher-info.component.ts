import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Publisher } from '@app/models/library/publisher';
import { CardModule } from '@app/shared/card/card.module';
import { FormModule } from '@app/shared/form/form.module';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
  selector: 'assoc-library-admin-publisher-info',
  standalone: true,
  imports: [CommonModule, CardModule, FormModule, PlaceholderDirective],
  templateUrl: './library-admin-publisher-info.component.html'
})
export class LibraryAdminPublisherInfoComponent {

  @Input() public data = new Publisher();

  @Input() public waiting = false;

  @Input() public showMenu = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

}

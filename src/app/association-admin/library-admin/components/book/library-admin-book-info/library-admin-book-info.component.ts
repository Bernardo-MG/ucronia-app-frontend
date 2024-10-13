import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '@app/models/library/book';
import { CardModule } from '@app/shared/card/card.module';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
  selector: 'assoc-library-admin-book-info',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, CardModule, WaitingButtonComponent, ModalComponent, PlaceholderDirective],
  templateUrl: './library-admin-book-info.component.html'
})
export class LibraryAdminBookInfoComponent {

  @Input() public data = new Book();

  @Input() public showMenu = false;

  @Input() public editEnabled = false;

  @Input() public waiting = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  public get authors(): string {
    return this.data.authors.map(e => e.name).join(", ");
  }

  public get donors(): string {
    return this.data.donors.map(e => e.name).join(", ");
  }

  public get publishers(): string {
    return this.data.publishers.map(e => e.name).join(", ");
  }

}

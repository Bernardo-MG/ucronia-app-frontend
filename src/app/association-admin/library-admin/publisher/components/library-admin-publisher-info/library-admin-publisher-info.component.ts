import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Publisher } from '@app/models/library/publisher';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, PlaceholderDirective } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-library-admin-publisher-info',
  imports: [CommonModule, PlaceholderDirective, ControlButtonsComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent],
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

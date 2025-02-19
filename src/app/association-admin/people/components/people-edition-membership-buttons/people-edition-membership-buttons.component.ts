import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent, WaitingButtonWrapperComponent } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-people-edition-membership-buttons',
  imports: [CommonModule, WaitingButtonWrapperComponent, ModalComponent],
  templateUrl: './people-edition-membership-buttons.component.html'
})
export class PeopleEditionMembershipButtonsComponent {

  @Input() public active: boolean | undefined = undefined;

  @Input() public renew: boolean | undefined = undefined;

  @Input() public disabled = false;

  @Input() public waiting = false;

  @Output() public activate = new EventEmitter<void>();

  @Output() public deactivate = new EventEmitter<void>();

  @Output() public enableRenew = new EventEmitter<void>();

  @Output() public disableRenew = new EventEmitter<void>();

  @Output() public convertToMember = new EventEmitter<void>();

}

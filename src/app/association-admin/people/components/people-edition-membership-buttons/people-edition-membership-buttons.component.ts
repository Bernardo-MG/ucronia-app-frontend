
import { Component, EventEmitter, Output, input } from '@angular/core';
import { ModalComponent } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-people-edition-membership-buttons',
  imports: [ModalComponent],
  templateUrl: './people-edition-membership-buttons.component.html'
})
export class PeopleEditionMembershipButtonsComponent {

  public readonly active = input<boolean>();

  public readonly renew = input<boolean>();

  public readonly disabled = input(false);

  @Output() public activate = new EventEmitter<void>();

  @Output() public deactivate = new EventEmitter<void>();

  @Output() public enableRenew = new EventEmitter<void>();

  @Output() public disableRenew = new EventEmitter<void>();

  @Output() public convertToMember = new EventEmitter<void>();

}

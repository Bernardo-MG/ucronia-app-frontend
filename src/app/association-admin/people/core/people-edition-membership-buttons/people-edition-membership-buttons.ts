
import { Component, input, output } from '@angular/core';
import { ModalComponent } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-people-edition-membership-buttons',
  imports: [ModalComponent],
  templateUrl: './people-edition-membership-buttons.html'
})
export class PeopleEditionMembershipButtons {

  public readonly active = input<boolean>();

  public readonly renew = input<boolean>();

  public readonly disabled = input(false);

  public readonly activate = output<void>();

  public readonly deactivate = output<void>();

  public readonly enableRenew = output<void>();

  public readonly disableRenew = output<void>();

  public readonly convertToMember = output<void>();

}

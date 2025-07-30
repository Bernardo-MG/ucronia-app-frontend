import { Component, input } from '@angular/core';
import { Account } from '@app/account/models/account';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
    selector: 'account-profile-info',
    imports: [PlaceholderDirective],
    templateUrl: './account-profile-info.component.html'
})
export class AccountProfileInfoComponent {

  public readonly account = input(new Account());

  public readonly waiting = input(false);

}

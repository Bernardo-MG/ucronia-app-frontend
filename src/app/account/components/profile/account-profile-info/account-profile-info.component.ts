import { Component, Input } from '@angular/core';
import { Account } from '@app/account/models/account';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
    selector: 'account-profile-info',
    imports: [PlaceholderDirective],
    templateUrl: './account-profile-info.component.html'
})
export class AccountProfileInfoComponent {

  @Input() public account = new Account();

  @Input() public waiting = false;

}

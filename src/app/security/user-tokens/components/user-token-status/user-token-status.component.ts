import { Component, Input } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'access-user-token-status',
    imports: [IconSuccessOrFailureComponent],
    templateUrl: './user-token-status.component.html'
})
export class UserTokenStatusComponent {

  @Input() public data = new UserToken();

}

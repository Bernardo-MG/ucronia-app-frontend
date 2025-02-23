import { Component, Input } from '@angular/core';
import { UserToken } from '../../../../../../projects/bernardo-mg/authentication/src/lib/models/user-token';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'access-user-token-status',
    imports: [IconSuccessOrFailureComponent],
    templateUrl: './user-token-status.component.html'
})
export class UserTokenStatusComponent {

  @Input() public data = new UserToken();

}

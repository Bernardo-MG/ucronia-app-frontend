import { Component, Input } from '@angular/core';
import { UserToken } from '@app/core/authentication/models/user-token';
import { IconSuccessOrFailureComponent } from '@app/shared/icons/components/icon-success-or-failure/icon-success-or-failure.component';

@Component({
    selector: 'access-user-token-status',
    imports: [IconSuccessOrFailureComponent],
    templateUrl: './user-token-status.component.html'
})
export class UserTokenStatusComponent {

  @Input() public data = new UserToken();

}

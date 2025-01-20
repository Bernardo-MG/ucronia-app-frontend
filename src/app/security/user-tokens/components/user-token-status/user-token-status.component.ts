import { Component, Input } from '@angular/core';
import { UserToken } from '@app/core/authentication/models/user-token';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
    selector: 'access-user-token-status',
    imports: [IconsModule],
    templateUrl: './user-token-status.component.html'
})
export class UserTokenStatusComponent {

  @Input() public data = new UserToken();

}

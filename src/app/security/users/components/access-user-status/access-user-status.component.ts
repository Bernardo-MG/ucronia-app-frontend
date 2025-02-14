import { Component, Input } from '@angular/core';
import { User } from '@app/core/authentication/models/user';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'access-user-status',
    imports: [IconSuccessOrFailureComponent],
    templateUrl: './access-user-status.component.html'
})
export class AccessUserStatusComponent {

  @Input() data = new User();

}

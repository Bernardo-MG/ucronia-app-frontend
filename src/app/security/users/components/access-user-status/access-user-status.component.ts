import { Component, Input } from '@angular/core';
import { User } from '../../../../../../projects/bernardo-mg/authentication/src/lib/models/user';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'access-user-status',
    imports: [IconSuccessOrFailureComponent],
    templateUrl: './access-user-status.component.html'
})
export class AccessUserStatusComponent {

  @Input() data = new User();

}

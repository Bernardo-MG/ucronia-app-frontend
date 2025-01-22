import { Component, Input } from '@angular/core';
import { User } from '@app/core/authentication/models/user';
import { CardModule } from '@app/shared/card/card.module';
import { IconSuccessOrFailureComponent } from '@app/shared/icons/components/icon-success-or-failure/icon-success-or-failure.component';

@Component({
    selector: 'access-user-status',
    imports: [IconSuccessOrFailureComponent, CardModule],
    templateUrl: './access-user-status.component.html'
})
export class AccessUserStatusComponent {

  @Input() data = new User();

}

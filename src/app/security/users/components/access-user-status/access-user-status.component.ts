import { Component, Input } from '@angular/core';
import { User } from '@app/core/authentication/models/user';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
    selector: 'access-user-status',
    imports: [IconsModule, CardModule],
    templateUrl: './access-user-status.component.html'
})
export class AccessUserStatusComponent {

  @Input() data = new User();

}

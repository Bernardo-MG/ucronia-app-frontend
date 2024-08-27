import { Component, Input } from '@angular/core';
import { User } from '@app/core/authentication/models/user';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'access-user-status',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './access-user-status.component.html'
})
export class AccessUserStatusComponent {

  @Input() data = new User();

}

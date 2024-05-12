import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '@app/core/authentication/models/user';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'access-user-info',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './access-user-info.component.html'
})
export class AccessUserInfoComponent {

  @Input() data = new User();

}

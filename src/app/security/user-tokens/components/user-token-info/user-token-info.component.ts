import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { FailureStore } from '@bernardo-mg/request';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'access-user-token-info',
  imports: [CommonModule, PlaceholderDirective],
  templateUrl: './user-token-info.component.html'
})
export class UserTokenInfoComponent {

  @Input() public data = new UserToken();

  @Input() public failures = new FailureStore();

  @Input() public waiting = false;

}

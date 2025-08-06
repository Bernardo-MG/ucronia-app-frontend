
import { Component, input } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { FailureStore } from '@bernardo-mg/request';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'access-user-token-info',
  imports: [SkeletonModule],
  templateUrl: './user-token-info.component.html'
})
export class UserTokenInfoComponent {

  public readonly data = input(new UserToken());

  public readonly failures = input(new FailureStore());

  public readonly loading = input(false);

}

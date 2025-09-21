import { Component, input } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'access-user-token-status',
  imports: [SkeletonModule],
  templateUrl: './user-token-status.html'
})
export class UserTokenStatus {

  public readonly data = input(new UserToken());
  
  public readonly loading = input(true);

}

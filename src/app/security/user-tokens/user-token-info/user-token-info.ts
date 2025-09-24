
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'access-user-token-info',
  imports: [SkeletonModule, DatePipe],
  templateUrl: './user-token-info.html'
})
export class UserTokenInfo {

  public readonly data = input(new UserToken());

  public readonly loading = input(false);

}

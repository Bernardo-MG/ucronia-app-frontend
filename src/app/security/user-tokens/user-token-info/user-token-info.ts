
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'access-user-token-info',
  imports: [CardModule, StatusDetail, DetailField, DatePipe],
  templateUrl: './user-token-info.html'
})
export class UserTokenInfo {

  public readonly data = input(new UserToken());

  public readonly loading = input(false);

}

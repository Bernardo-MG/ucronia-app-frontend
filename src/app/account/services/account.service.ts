import { Injectable } from '@angular/core';
import { RequestClient } from '@app/shared/utils/api/request/request-client';
import { UpdateOperations } from '@app/shared/utils/api/request/update-operations';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { PasswordChange } from '../models/password-change';
import { PasswordChangeStatus } from '../models/password-change-status';

@Injectable()
export class AccountService {

  private changePasswordUrl = environment.apiUrl + "/password/change";

  constructor(
    private client: RequestClient
  ) {}

  public changePassword(data: PasswordChange): Observable<PasswordChangeStatus> {
    const clt: UpdateOperations<PasswordChangeStatus> = this.client.update(this.changePasswordUrl);
    return clt.body(data).push().pipe(map(r => r.content));
  }

}

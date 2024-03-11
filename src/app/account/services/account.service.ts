import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { PasswordChange } from '../models/password-change';
import { PasswordChangeStatus } from '../models/password-change-status';
import { Account } from '../models/account';
import { AuthContainer } from '@app/core/authentication/services/auth.service';

@Injectable()
export class AccountService {

  private operations: Request;

  private changePasswordUrl = environment.apiUrl + "/password/change";

  constructor(
    http: HttpClient,
    private authContainer: AuthContainer
  ) {
    this.operations = new AngularRequest(http, this.changePasswordUrl);
  }

  public getAccount(): Observable<Account> {
    return this.authContainer.getDetails().pipe(map(s => {
      const account = new Account();

      account.username = s.username;
      account.email = '';

      return account;
    }));
  }

  public changePassword(data: PasswordChange): Observable<PasswordChangeStatus> {
    const resp: Observable<SimpleResponse<PasswordChangeStatus>> = this.operations.update(data);
    return resp.pipe(map(r => r.content));
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Account } from '../models/account';
import { PasswordChange } from '../models/password-change';
import { PasswordChangeStatus } from '../models/password-change-status';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient,
    private authContainer: AuthContainer
  ) { }

  public getAccount(): Observable<Account> {
    return this.authContainer.getDetails().pipe(map(s => {
      const account = new Account();

      account.username = s.username;
      account.email = '';

      return account;
    }));
  }

  public changePassword(data: PasswordChange): Observable<PasswordChangeStatus> {
    return this.getClient()
      .update<SimpleResponse<PasswordChangeStatus>>(data)
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + "/password/change");
  }


}

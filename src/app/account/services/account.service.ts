import { Injectable } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Account } from '../models/account';
import { PasswordChange } from '../models/password-change';
import { PasswordChangeStatus } from '../models/password-change-status';

@Injectable({
  providedIn: "root"
})
export class AccountService {

  private accountClient;

  private passwordChangeClient;

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) {
    this.passwordChangeClient = this.clientProvider.url(environment.apiUrl + '/password/change');
    this.accountClient = this.clientProvider.url(environment.apiUrl + '/account');
  }

  public getAccount(): Observable<Account> {
    return this.accountClient
      .read<SimpleResponse<Account>>()
      .pipe(map(r => r.content));
  }

  public changePassword(data: PasswordChange): Observable<PasswordChangeStatus> {
    return this.passwordChangeClient
      .update<SimpleResponse<PasswordChangeStatus>>(data)
      .pipe(map(r => r.content));
  }

}

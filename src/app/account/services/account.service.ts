import { Injectable } from '@angular/core';
import { AngularCrudClientProvider, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Account } from '../models/account';
import { PasswordChange } from '../models/password-change';
import { PasswordChangeStatus } from '../models/password-change-status';

@Injectable({
  providedIn: "root"
})
export class AccountService {

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) { }

  public getAccount(): Observable<Account> {
    return this.getAccountClient()
      .read<SimpleResponse<Account>>()
      .pipe(map(r => r.content));
  }

  public changePassword(data: PasswordChange): Observable<PasswordChangeStatus> {
    return this.getPasswordChangeClient()
      .update<SimpleResponse<PasswordChangeStatus>>(data)
      .pipe(map(r => r.content));
  }

  private getPasswordChangeClient(): CrudClient {
    return this.clientProvider.url(environment.apiUrl + "/password/change");
  }

  private getAccountClient(): CrudClient {
    return this.clientProvider.url(environment.apiUrl + "/account");
  }

}

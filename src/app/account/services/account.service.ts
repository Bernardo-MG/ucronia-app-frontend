import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SimpleResponse } from '@app/core/api/models/simple-response';
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
    private http: HttpClient
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

  private getPasswordChangeClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + "/password/change");
  }

  private getAccountClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + "/account");
  }

}

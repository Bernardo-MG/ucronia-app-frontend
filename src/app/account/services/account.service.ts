import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { AngularHttpOperations } from '@app/core/api/repository/angular-http-operations';
import { HttpOperations } from '@app/core/api/repository/http-operations';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { PasswordChange } from '../models/password-change';
import { PasswordChangeStatus } from '../models/password-change-status';

@Injectable()
export class AccountService {

  private operations: HttpOperations;

  private changePasswordUrl = environment.apiUrl + "/password/change";

  constructor(
    http: HttpClient
  ) {
    this.operations = new AngularHttpOperations(http, this.changePasswordUrl);
  }

  public changePassword(data: PasswordChange): Observable<PasswordChangeStatus> {
    const resp: Observable<ApiResponse<PasswordChangeStatus>> = this.operations.body(data).update();
    return resp.pipe(map(r => r.content));
  }

}

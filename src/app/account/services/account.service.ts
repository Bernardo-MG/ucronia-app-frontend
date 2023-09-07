import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { AngularRequest } from '@app/core/api/repository/angular-request';
import { Request } from '@app/core/api/repository/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { PasswordChange } from '../models/password-change';
import { PasswordChangeStatus } from '../models/password-change-status';

@Injectable()
export class AccountService {

  private operations: Request;

  private changePasswordUrl = environment.apiUrl + "/password/change";

  constructor(
    http: HttpClient
  ) {
    this.operations = new AngularRequest(http, this.changePasswordUrl);
  }

  public changePassword(data: PasswordChange): Observable<PasswordChangeStatus> {
    const resp: Observable<ApiResponse<PasswordChangeStatus>> = this.operations.update(data);
    return resp.pipe(map(r => r.content));
  }

}

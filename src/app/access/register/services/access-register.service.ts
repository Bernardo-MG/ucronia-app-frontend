import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { AngularHttpOperations } from '@app/core/api/repository/angular-http-operations';
import { HttpOperations } from '@app/core/api/repository/http-operations';
import { RegisterForm } from '@app/core/authentication/models/register-form';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable()
export class AccessRegisterService {

  private operations: HttpOperations;

  private registerUrl = environment.apiUrl + "/security/register";

  constructor(
    http: HttpClient
  ) {
    this.operations = new AngularHttpOperations(http, this.registerUrl);
  }

  public register(data: RegisterForm): Observable<RegisterForm> {
    const resp: Observable<ApiResponse<RegisterForm>> = this.operations.body(data).create();
    return resp.pipe(map(r => r.content));
  }

}

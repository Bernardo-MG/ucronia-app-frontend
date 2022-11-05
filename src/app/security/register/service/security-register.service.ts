import { Injectable } from '@angular/core';
import { CreateOperations } from '@app/api/request/create-operations';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RegisterForm } from '../model/register-form';

@Injectable()
export class SecurityRegisterService {

  private registerUrl = environment.apiUrl + "/security/register";

  constructor(
    private client: RequestClient
  ) { }

  public register(data: RegisterForm): Observable<RegisterForm> {
    const clt: CreateOperations<RegisterForm> = this.client.create(this.registerUrl);
    return clt.body(data).pushUnwrapped();
  }

}

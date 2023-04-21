import { Injectable } from '@angular/core';
import { RegisterForm } from '@app/core/authentication/models/register-form';
import { CreateOperations } from '@app/shared/utils/api/request/create-operations';
import { RequestClient } from '@app/shared/utils/api/request/request-client';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessRegisterService {

  private registerUrl = environment.apiUrl + "/security/register";

  constructor(
    private client: RequestClient
  ) { }

  public register(data: RegisterForm): Observable<RegisterForm> {
    const clt: CreateOperations<RegisterForm> = this.client.create(this.registerUrl);
    return clt.body(data).push().pipe(map(r => r.content));
  }

}

import { Injectable } from '@angular/core';
import { CreateOperations } from '@app/api/request/create-operations';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { ChangePasswordForm } from '../model/change-password-form';

@Injectable()
export class SecurityChangePasswordService {

  private registerUrl = environment.apiUrl + "/security/password";

  constructor(
    private client: RequestClient
  ) { }

  public changePassword(data: ChangePasswordForm): Observable<ChangePasswordForm> {
    const clt: CreateOperations<ChangePasswordForm> = this.client.create(this.registerUrl);
    return clt.body(data).push().pipe(map(r => r.content));
  }

}

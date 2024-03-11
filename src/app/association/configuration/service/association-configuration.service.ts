import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { AssociationConfiguration } from '../models/association-configuration';

@Injectable()
export class AssociationConfigurationService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<AssociationConfiguration> {
    return this.getRequest()
      .read<SimpleResponse<AssociationConfiguration>>()
      .pipe(map(r => r.content));
  }

  public update(data: AssociationConfiguration): Observable<AssociationConfiguration> {
    return this.getRequest()
      .update<SimpleResponse<AssociationConfiguration>>(data)
      .pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/configuration/association');
  }

}

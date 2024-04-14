import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { AssociationConfiguration } from '../models/association-configuration';
import { Configuration } from '../models/configuration';

@Injectable()
export class AssociationConfigurationService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<AssociationConfiguration> {
    return this.getClient()
      .read<SimpleResponse<AssociationConfiguration>>()
      .pipe(map(r => r.content));
  }

  public getAll(): Observable<Configuration[]> {
    return this.getConfigurationClient()
      .read<SimpleResponse<Configuration[]>>()
      .pipe(map(r => r.content));
  }

  public update(data: AssociationConfiguration): Observable<AssociationConfiguration> {
    return this.getClient()
      .update<SimpleResponse<AssociationConfiguration>>(data)
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/configuration/association');
  }

  private getConfigurationClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/configuration');
  }

}

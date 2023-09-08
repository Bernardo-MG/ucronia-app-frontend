import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationApi } from '@app/core/api/client/configuration-api';
import { Observable, map } from 'rxjs';
import { AssociationConfiguration } from '../models/association-configuration';

@Injectable()
export class AssociationConfigurationService {

  private configurationApi = new ConfigurationApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<AssociationConfiguration> {
    return this.configurationApi.readOne().pipe(map(r => r.content));
  }

  public update(data: AssociationConfiguration): Observable<AssociationConfiguration> {
    return this.configurationApi.update(data).pipe(map(r => r.content));
  }

}

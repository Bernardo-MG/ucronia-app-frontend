import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Configuration } from '../models/configuration';

@Injectable({
  providedIn: "root"
})
export class AssociationConfigurationService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Configuration[]> {
    return this.getClient()
      .read<SimpleResponse<Configuration[]>>()
      .pipe(map(r => r.content));
  }

  public update(code: string, configuration: Configuration): Observable<Configuration> {
    return this.getClient()
      .appendRoute(`/${code}`)
      .update<SimpleResponse<Configuration>>(configuration)
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/configuration');
  }

}

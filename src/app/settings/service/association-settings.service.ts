import { Injectable } from '@angular/core';
import { AngularCrudClientFactory, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Setting } from '../models/setting';

@Injectable({
  providedIn: "root"
})
export class AssociationSettingsService {

  constructor(
    private clientFactory: AngularCrudClientFactory
  ) { }

  public getAll(): Observable<Setting[]> {
    return this.getClient()
      .read<SimpleResponse<Setting[]>>()
      .pipe(map(r => r.content));
  }

  public update(code: string, setting: Setting): Observable<Setting> {
    return this.getClient()
      .appendRoute(`/${code}`)
      .update<SimpleResponse<Setting>>(setting)
      .pipe(map(r => r.content));
  }

  private getClient(): CrudClient {
    return this.clientFactory.url(environment.apiUrl + '/settings');
  }

}

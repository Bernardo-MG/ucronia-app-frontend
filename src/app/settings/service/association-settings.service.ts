import { Injectable } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Setting } from '../models/setting';

@Injectable({
  providedIn: "root"
})
export class AssociationSettingsService {

  private client;

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) {
    this.client = this.clientProvider.url(environment.apiUrl + '/settings');
  }

  public getAll(): Observable<Setting[]> {
    return this.client
      .read<SimpleResponse<Setting[]>>()
      .pipe(map(r => r.content));
  }

  public update(code: string, setting: Setting): Observable<Setting> {
    return this.client
      .appendRoute(`/${code}`)
      .update<SimpleResponse<Setting>>(setting)
      .pipe(map(r => r.content));
  }

}
